import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class CreateRegistry extends Component {
    state = {
        events: [],
        created: false
    };
    onRegistryFormChange = e => {
        const element = e.target;
        const { name, value } = element;
        console.log(name, value);
        const newState = {};
        newState[name] = value;
        this.setState(newState);
        console.log(newState);
    };

    onRegistryFormSubmit = async event => {
        console.log("working");
        event.preventDefault();
        let newEvent = {
            title: this.state.title,
            type: this.state.event,
            date: this.state.date,
            host_1: `${this.state.host1_firstname} ${
                this.state.host1_lastname
            }`,
            host_2: `${this.state.host2_firstname} ${this.state.host2_lastname}`
        };
        console.log(newEvent);

        await axios.post("http://localhost:5000/event", newEvent);

        this.setState({
            events: newEvent,
            created: true
        });
    };

    render() {
        console.log(this.state);
        return (
            <div className="create-registry-container">
                <h1>Create Registry</h1>
                <form
                    onSubmit={e => {
                        this.onRegistryFormSubmit(e);
                    }}
                    onChange={e => {
                        this.onRegistryFormChange(e);
                    }}
                >
                    <label for="event">Select Event Type</label>
                    <select name="event">
                        <option diabled>Select day</option>
                        <option value="wedding">Wedding</option>
                        <option value="baby shower">Baby Shower</option>
                    </select>
                    <div>
                        <label for="date">What date is your event</label>
                        <input name="date" placeholder="mm/dd/yy" />
                    </div>
                    <div>
                        <label for="title">Event Title</label>
                        <input
                            name="title"
                            placeholder="example: Bella and Andrew's wedding"
                        />
                    </div>

                    <div>
                        <label for="host1_firstname">Your name</label>
                        <input
                            name="host1_firstname"
                            placeholder="first name"
                        />
                        <input name="host1_lastname" placeholder="last name" />
                    </div>
                    <div>
                        <label for="host2_firstname">
                            Your partner's name (optional)
                        </label>
                        <input
                            name="host2_firstname"
                            placeholder="first name"
                        />
                        <input name="host2_lastname" placeholder="last name" />
                    </div>
                    {/* <Link to="user/registry"> */}
                    <button>create my registry</button>
                    {/* </Link> */}
                </form>
            </div>
        );
    }
}

export default CreateRegistry;
