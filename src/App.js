import React from 'react';
import Writer from './Writer';
import Title from './Title';
import Sidebar from './Sidebar';

import Plain from 'slate-plain-serializer';

import './App.css';
import uuid from 'uuid/v4';

const defaultContent = Plain.deserialize(`
Call me Ishmael.
=======

_Some years ago_ - never mind **how long** precisely - having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people's hats off - then, I account it high time to get to sea as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the ship. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the ocean with me.
`);


export default class App extends React.Component {

    state = {
        loading: true,
        files: []
    };

    onSelect = id => {
        let fs = this.state.files;
        fs.forEach(f => {
            f.selected = false;
        });
        fs.find(f => f.id === id).selected = true;
        this.setState({ files: fs });
    };

    onDelete = id => {
        let fs = this.state.files;
        let file = fs.find(f => f.id === id);

        if (fs.length === 1) {
            fs.unshift(this.newFile("Chapter One"));
        }

        let idx = fs.indexOf(file);
        if (idx === -1) return;
        fs.splice(idx, 1);

        if (file.selected) {
            fs[0].selected = true;
        }

        this.setState({ files: fs });
        localStorage.setItem("neue-fc-0", JSON.stringify(this.state.files));
    };

    newFile = (title, selected) => ({
        id: uuid(),
        name: Plain.deserialize(title),
        content: defaultContent,
        selected: !!selected
    });

    addFile = () => {
        let { files } = this.state;
        files.push(this.newFile("Chapter One"));
        this.setState(files);
    };

    updateCurrentName = n => {
        let selectedFile = this.state.files.find(f => f.selected);
        selectedFile.name = n;
        this.setState({
            files: this.state.files
        });

        this.store();
    };

    updateCurrentContent = n => {
        let selectedFile = this.state.files.find(f => f.selected);
        if (!selectedFile) {
            console.error("asked to update file but none selected");
            return;
        }

        selectedFile.content = n;
        this.setState({
            files: this.state.files
        });

        this.store();
    };

    load = () => {
        let loaded = localStorage.getItem("neue-fc-0");
        loaded = JSON.parse(loaded);

        if (!loaded) return [];

        loaded = loaded.map(({ name, content, ...other }) => ({
            name: Plain.deserialize(name),
            content: Plain.deserialize(content),
            ...other
        }));

        return loaded;
    };

    store = () => {
        let serialised = this.state.files
            .map(({ name, content, ...other }) => ({
                name: Plain.serialize(name),
                content: Plain.serialize(content),
                ...other
            }));
        localStorage.setItem("neue-fc-0", JSON.stringify(serialised));
    };

    componentDidMount() {
        let loaded = this.load();
        if (!loaded || loaded.length === 0) {
            return this.setState({
                loading: false,
                files: [this.newFile("Chapter One", true)]
            })
        }
        
        // just select first by default
        loaded.forEach(f => {
            f.selected = false;
        });
        
        loaded[0].selected = true;

        this.setState({
            loading: false,
            files: loaded
        });
    }


    render() {
        if (this.state.loading) {
            return (
                <p>loading ...</p>
            );
        };

        let files = this.state.files;
        let selectedFile = files.find(f => f.selected);
        if (!selectedFile) selectedFile = files[0];

        return (
            <section className="app">
                <Sidebar
                    addFile={this.addFile}
                    onSelect={this.onSelect}
                    onDelete={this.onDelete}
                    files={files}
                ></Sidebar>
                <main className="content">
                    <div>
                        <Title
                            value={selectedFile.name}
                            onUpdate={this.updateCurrentName}
                        ></Title>

                        <Writer
                            content={selectedFile.content}
                            onUpdate={this.updateCurrentContent}
                        >
                        </Writer>
                    </div>
                </main>
            </section>
        );
    }
}