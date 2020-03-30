import React, {Component} from "react";

class Profile extends Component {

    state = {selectedFile: null}

    fileChangedHandler = event => {
        this.setState({selectedFile: event.target.files[0]})
    }

    uploadHandler = () => {
        console.log(
            this.state.selectedFile)
    }

    uploadHandler = () => {
        const formData = new FormData()
        formData.append(
            'myFile',
            this.state.selectedFile,
            this.state.selectedFile.name
        )
       // axios.post('my-domain.com/file-upload', formData)
    }
    render() {
        return (
            <div>
                <h2>Profile</h2>

                <form>
                    <p>
                        <label>First Name</label> <br/>
                        <input className="w3-input" type="text"/></p>
                    <p>
                        <label>Last Name</label><br/>
                        <input className="w3-input" type="text"/></p>
                    <p>
                        <label>Email</label><br/>
                        <input className="w3-input" type="text"/></p>
                    <p>
                        <label>Birthday</label><br/>
                        <input type="date" name="party" min="1920-01-01" max="2002-01-01"/>
                    </p>
                    <p>
                        <input type="file" onChange={this.fileChangedHandler}/>
                        <button onClick={this.uploadHandler}>Upload!</button>
                    </p>
                </form>
            </div>
        );
    }
}

export default Profile;