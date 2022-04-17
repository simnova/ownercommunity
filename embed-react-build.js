function EmbedReactBuild() {
    this.url;
    this.dependencies;

    this.setURL = function(url) {
        this.url = url;
    }

    this.setDependencies = function(dep) {
        this.dependencies = dep;

        return dep;
    }

    this._fetchDependencies = function() {
        return fetch(this.url + 'asset-manifest.json')
            .then(res => res.json())
            .then(res => res.entrypoints.map(e => Object.values(res.files).find(f => f.search(e) > 0)))
            .then(dep => this.setDependencies(dep))
    }

    this._injectDependencies = function() {
        const url = this.url;
        this.dependencies.forEach((dep) => {
            const ext = dep.split(".").slice(-1)[0];

            switch(ext) {
                case 'css':
                    let link = document.createElement('link');
                    link.rel = "stylesheet";
                    link.href =  dep;
                    document.head.appendChild(link);
                break;
                case 'js':
                    let script = document.createElement('script');
                    script.src =  dep;
                    document.body.appendChild(script);
                break;
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


