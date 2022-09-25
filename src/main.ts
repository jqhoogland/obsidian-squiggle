import { loadPrism, MarkdownRenderer, Plugin } from 'obsidian';

import * as Prism from 'prismjs';
import { Outputter } from "./Outputter";
import { squigglePrism } from './prism';
import { renderSquiggle } from "./squiggle";

const supportedLanguages = ["squiggle"];

const buttonText = "Run";

const runButtonClass = "run-code-button";
const runButtonDisabledClass = "run-button-disabled";
const hasButtonClass = "has-run-code-button";


export default class SquigglePlugin extends Plugin {
	async onload() {
		await loadPrism().then((prism: typeof Prism) => prism.languages.squiggle = squigglePrism(prism))

		this.addRunButtons(document.body);
		this.registerMarkdownPostProcessor((element, _context) => {
			this.addRunButtons(element);

		});

		// live preview renderers
		supportedLanguages.forEach(l => {
			console.log(`registering renderer for ${l}`)
			this.registerMarkdownCodeBlockProcessor(`run-${l}`, async (src, el, _ctx) => {
				await MarkdownRenderer.renderMarkdown('```' + l + '\n' + src + '\n```', el, '', null)
			})
		})
	}

	onunload() {
		document
			.querySelectorAll("pre > code")
			.forEach((codeBlock: HTMLElement) => {
				const pre = codeBlock.parentElement as HTMLPreElement;
				const parent = pre.parentElement as HTMLDivElement;

				if (parent.hasClass(hasButtonClass)) {
					parent.removeClass(hasButtonClass);
				}
			});

		document
			.querySelectorAll("." + runButtonClass)
			.forEach((button: HTMLButtonElement) => button.remove());

		document
			.querySelectorAll("." + runButtonDisabledClass)
			.forEach((button: HTMLButtonElement) => button.remove());

		document
			.querySelectorAll(".clear-button")
			.forEach((button: HTMLButtonElement) => button.remove());

		document
			.querySelectorAll(".language-output")
			.forEach((out: HTMLElement) => out.remove());

		console.log("Unloaded plugin: Execute Code");
	}

	private addRunButtons(element: HTMLElement) {
		element.querySelectorAll("code")
			.forEach((codeBlock: HTMLElement) => {
				console.log({codeBlock})
				const pre = codeBlock.parentElement as HTMLPreElement;
				const parent = pre.parentElement as HTMLDivElement;
				const language = codeBlock.className.toLowerCase();

				const srcCode = codeBlock.getText();	// get source code and perform magic to insert title etc

				if (supportedLanguages.some((lang) => language.contains(`language-${lang}`))
					&& !parent.classList.contains(hasButtonClass)) { // unsupported language

					parent.classList.add(hasButtonClass);
					const button = this.createRunButton();
					pre.appendChild(button);

					const out = new Outputter(codeBlock);

					// Add button:
					if (language.contains("language-squiggle")) {
						button.addEventListener("click", async () => {
							this.runCode(srcCode, out, button);
						});
					}
				}
			})
	}


	private createRunButton() {
		console.log("Add run button");
		const button = document.createElement("button");
		button.classList.add(runButtonClass);
		button.setText(buttonText);
		return button;
	}

	private runCode(codeBlockContent: string, outputter: Outputter, button: HTMLButtonElement) {
		outputter.clear();
		outputter.addOutputElement();
		renderSquiggle(codeBlockContent, outputter.outputElement);
	}
}
