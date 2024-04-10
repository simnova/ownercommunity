function EmbedReactBuild() {
    this.url = '';
    this.dependencies = [];

    this.setURL = function(url) {
        this.url = url;
    }

    this.setDependencies = function(dep) {
        this.dependencies.push(...dep);
        return dep;
    }

    this._fetchDependencies = function() {
        return fetch(this.url + '.vite/manifest.json')
            .then(res => res.json())
            .then(res => {
                this.setDependencies([res['index.html'].file]);
                this.setDependencies(res['index.html'].css);
                }
            )

    }

    this._injectDependencies = function() {
        const url = this.url;
        this.dependencies.forEach((dep) => {
            const ext = dep.split(".").slice(-1)[0];

            switch(ext) {
                case 'css': {
                    let link = document.createElement('link');
                    link.rel = "stylesheet";
                    link.href =  url + dep;
                    document.head.appendChild(link);
                    break;
                }
                case 'js': {
                    let script = document.createElement('script');
                    script.src =  url + dep;
                    script.type = "module";
                    document.body.appendChild(script);
                    break;
                }
                default:
            }
        })
    }

    this.run = function() {
        return this._fetchDependencies()
            .then(() => this._injectDependencies());
    }
}

window.onload = (event) => {
    const embed = new EmbedReactBuild()
    embed.setURL("https://ownercommunity-ui.pages.dev/")
    embed.run()
};


