import './App.css'
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CKEditor from 'ckeditor4-react';
import './App.css'


class TwoWayBinding extends Component {
    constructor( props ) {
        super( props );

        this.state = {
            data: ''
        };

        this.handleChange = this.handleChange.bind( this );
        this.onEditorChange = this.onEditorChange.bind( this );
    }

    onEditorChange( evt ) {
        this.setState( {
            data: evt.editor.getData()
        } );
    }

    handleChange( changeEvent ) {
        this.setState( {
            data: changeEvent.target.value
        } );
    }

    handleClick = () => {
        console.log(this.state.data.replace(/(<([^>]+)>)/gi, ""));
    }
    render() {
        return (
            <div>
                <CKEditor
                    data={this.state.data}
                    onChange={this.onEditorChange} />
                    <button onClick={this.handleClick}>
                        Spara
                    </button>
            </div>
        );
    }
}


export default TwoWayBinding;