import './App.css'
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CKEditor from 'ckeditor4-react';
import queryString from 'query-string'; // import the queryString class


class TwoWayBinding extends Component {
    constructor( props ) {
        super( props );
        var jsonFileNames = {};
        this.state = {
            data: '',
            name: 'default.txt',
            dropvalue: ''
        };
    }
    

    onEditorChange = ( evt ) => {
        this.setState({data: evt.editor.getData()});
    }
    //array.forEach(item => console.log(item));
    //
    getApiFiles() {
        const [fileNames, updateNames] = React.useState([]);

        React.useEffect(function effectFunction() {
            fetch('http://localhost:1337/getdocs', { method: 'GET' })
                .then(data => data.json()) // Parsing the data into a JavaScript object
                .then(({ data: fileNames }) => {
                    updateNames(fileNames);
                });
        }, []);
        fileNames.map(fileName => (console.log(fileName.filename)));
    }

    postApi() {
        fetch('http://localhost:1337/save', {
            method: 'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded'}, // this line is important, if this content-type is not set it wont work
            body: queryString.stringify({filename:this.state.name, data:this.state.data}) //use the stringify object of the queryString class
        });
    }

    onSelect = (e) => {
        //console.log(e.target.value);
        this.getApiFiles();
        console.log(this.jsonFileNames);
        this.setState({dropvalue: e.target.value});
    }
    
    handleClick = () => {
        this.postApi();
        console.log(this.state.dropvalue);
        //console.log(this.state.data.replace(/(<([^>]+)>)/gi, ""));
        //console.log(this.state.selectValue);
    }
    
    changeTitle = (e) =>{
        this.setState({name: e.target.value});
    }
    
    render() {
        return (
            <div>
                <CKEditor
                    //data={this.state.data}
                    onChange={this.onEditorChange} />
                    <input type="text" onChange={this.changeTitle}/>
                    <button onClick={this.handleClick}>
                        Spara
                    </button>
                    <select onChange={this.onSelect}>
                        <option value="Orange">Orange</option>
                        <option value="Radish">Radish</option>
                        <option value="Cherry">Cherry</option>
                    </select>
            </div>
        );
    }
}

export default TwoWayBinding;
