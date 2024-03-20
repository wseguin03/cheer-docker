import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Set the cream color as the background for the entire page
document.body.style.backgroundColor = "#ece9d2";

const localizer = momentLocalizer(moment);

class AddEventForm extends React.Component {
  state = {
    title: '',
    start: '',
    end: '',
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      title: this.state.title,
      start: new Date(this.state.start),
      end: new Date(this.state.end),
      allDay: true,
    };
  
    // Send the new event to the backend
    fetch('/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEvent),
    })
    .then(response => response.json())
    .then(data => {
      this.props.addEvent(data); // Add the event with the data returned from the server (includes _id from MongoDB)
      this.setState({ title: '', start: '', end: '' }); // Reset form
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };
  

  render() {
    return (
      <form onSubmit={this.handleSubmit} style={{
        marginTop: '20px',
        padding: '20px',
        border: '1px solid #607043',
        borderRadius: '5px',
        backgroundColor: '#e5ae98',
        boxShadow: '0px 4px 8px rgba(96, 112, 67, 0.5)' // Adds shadow for depth
      }}>
        <h3 style={{ color: '#607043' }}>Add New Event</h3>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
            placeholder="Event Title"
            required
            style={{
              padding: '10px',
              margin: '5px 0',
              width: '100%',
              boxSizing: 'border-box',
              border: '2px solid #607043',
              borderRadius: '4px',
              focus: {
                borderColor: '#ea7859'
              }
            }}
          />
        </div>
        <div style={{ marginBottom: '10px', display: 'flex', gap: '10px' }}>
          <input
            type="datetime-local"
            name="start"
            value={this.state.start}
            onChange={this.handleChange}
            required
            style={{
              flex: 1,
              padding: '10px',
              border: '2px solid #607043',
              borderRadius: '4px',
              focus: {
                borderColor: '#ea7859'
              }
            }}
          />
          <input
            type="datetime-local"
            name="end"
            value={this.state.end}
            onChange={this.handleChange}
            required
            style={{
              flex: 1,
              padding: '10px',
              border: '2px solid #607043',
              borderRadius: '4px',
              focus: {
                borderColor: '#ea7859'
              }
            }}
          />
        </div>
        <button type="submit" style={{
          padding: '10px 20px',
          backgroundColor: '#607043',
          color: '#ece9d2',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          boxShadow: '0px 2px 4px rgba(96, 112, 67, 0.5)'
        }}>
          Add Event
        </button>
      </form>
    );
  }
}

class MyCalendar extends React.Component {
  state = {
    events: [],
  };

  componentDidMount() {
    this.fetchEvents();
  }

  fetchEvents = () => {
    //backend url
    fetch('/get-saved-events')
      .then((response) => response.json())
      .then((data) => {
        const mappedEvents = data.map((event) => {
          return {
            ...event,
            start: new Date(event.start),
            end: new Date(event.end),
          };
        });
        this.setState({ events: mappedEvents });
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
      });
  };

  addEvent = (event) => {
    this.setState({ events: [...this.state.events, event] });
  };

  //delete an event
  deleteEvent = (eventId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this event?');
    if (confirmDelete) {
      // backend url
      fetch(`/delete-events/${eventId}`, {
        method: 'DELETE',
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error while deleting event');
        }
        this.setState(prevState => ({
          events: prevState.events.filter(event => event._id !== eventId)
        }));
      })
      .catch((error) => {
        console.error('Error deleting event:', error);
      });
    }
  };
  eventStyleGetter = (event, start, end, isSelected) => {
    let backgroundColor = '#607043'; // Your orange color
    let style = {
      backgroundColor: event.hexColor || backgroundColor,
      borderRadius: '0px',
      opacity: 0.8,
      color: 'black',
      border: '0px',
      display: 'block'
    };
    return {
      style: style
    };
  };

  render() {
    return (
      <div style={{ margin: '20px' }}>
        <div style={{
          height: '500px',
          marginBottom: '20px',
          border: '1px solid #607043',
          borderRadius: '5px',
          boxShadow: '0px 4px 8px rgba(96, 112, 67, 0.5)'
        }}>
          <Calendar
            localizer={localizer}
            events={this.state.events}
            startAccessor="start"
            endAccessor="end"
            style={{ background: '#ece9d2' }}
            eventPropGetter={this.eventStyleGetter}
            onSelectEvent={event => this.deleteEvent(event._id)}
          />
        </div>
        <AddEventForm addEvent={this.addEvent} />
      </div>
    );
  }
}

export default MyCalendar;