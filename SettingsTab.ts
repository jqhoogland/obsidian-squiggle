import {App, PluginSettingTab, Setting} from "obsidian";
import ExecuteCodePlugin from "./main";

export interface ExecutorSettings {
	nodePath: string;
	timeout: number;
}

export class SettingsTab extends PluginSettingTab {
	plugin: ExecuteCodePlugin;

	constructor(app: App, plugin: ExecuteCodePlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display() {
		const {containerEl} = this;
		containerEl.empty();

		containerEl.createEl('h2', {text: 'Settings for the Code Execution Plugin.'});

		new Setting(containerEl)
			.setName('Timeout (in seconds)')
			.setDesc('The time after which a program gets shut down automatically. This is to prevent infinite loops. ')
			.addText(slider => slider
				.setPlaceholder("" + this.plugin.settings.timeout/1000)
				.onChange(async (value) => {
					if( Number(value) * 1000){
						console.log('Timeout set to: ' + value);
						this.plugin.settings.timeout = Number(value) * 1000;
					}
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Node path')
			.setDesc('The path to your node installation.')
			.addText(text => text
				.setPlaceholder(this.plugin.settings.nodePath)
				.setValue(this.plugin.settings.nodePath)
				.onChange(async (value) => {
					console.log('Node path set to: ' + value);
					this.plugin.settings.nodePath = value;
				}));
	}
}