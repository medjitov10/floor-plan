import React, {Component} from  'react';
import {connect} from 'react-redux';
import {createFloorPlan, updateFloorPlan} from './../../actions/floor_plans';
import {flashMessage} from './../../util/util';

class AddFloorPlan extends Component {

  constructor(props) {
    super(props);

    this.state = {
      clicked: false,
      arr: [],
      name: '',
      floor: '',
      plan_url: '',
      location_id: 0,
      disabled: true,
      name_class: 'form-group',
      name_error_message: '',
      action: 'Create'
    };
  }

  onUpdateSubmitClick(e) {
    e.preventDefault();
    const arr = this.props.customers &&
      this.props.customers.floor_plans.map( el => (el.name));
    if ( arr.includes(this.state.name) && this.state.name !== this.props.update.name ) {
      this.setState({
        name_class: 'form-group has-error',
        name_error_message: 'Not unique name'
      });
    } else {
      const floor_plan = {
        name: this.state.name,
        floor: this.state.floor,
        location_id: this.state.location_id,
        plan_url: this.state.plan_url,
        id: this.state.id
      };
      this.props.updateFloorPlan(floor_plan).then(() => {
        this.setState({
          name: '',
          floor: '',
          location_id: '',
          clicked: false
        });
        flashMessage('Floor Plan was successfully updated');
      });
    }
  }

  onInputChange(key, event)  {
    const arr = this.props.customers &&
      this.props.customers.floor_plans.map( el => (el.name));
    if (key == 'name') {
      if ( arr.includes(event.target.value) &&
        event.target.value !== (this.props.update && this.props.update.name) ) {
        this.setState({
          name_class: 'form-group has-error',
          name_error_message: 'Not unique name'
        });
      } else {
        this.setState({
          name_class: 'form-group ',
          name_error_message: ''
        });
      }
    }
    this.setState({
      [key]: event.target.value
    }, () => this.isDisabled());
  }

  onButtonClick(e) {
    e.preventDefault();
    this.setState({
      clicked: !this.state.clicked
    }, () => {
      this.awsUpload();
    });
  }

  isDisabled() {
    if (
      this.state.name.length > 0 && this.state.floor.length > 0
      && parseInt(this.state.location_id) !==0 && this.state.plan_url.length > 0) {
      this.setState({ disabled: false});
    } else if (!this.state.disabled) {
      this.setState({ disabled: true });
    }
  }

  clearUpdate(e) {
    e.preventDefault();
    this.setState({
      name: '',
      floor: '',
      plan_url: '',
      location_id: 0,
      clicked: false,
      action: "Create"
    });
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.update) {
      this.setState({
        name: nextProps.update.name,
        floor: nextProps.update.floor,
        plan_url: nextProps.update.plan_url,
        location_id: nextProps.update.location_id,
        id: nextProps.update.id,
        clicked: true,
        action: 'Update'
      }, () => this.awsUpload());
    }
  }

  awsUpload() {
    $('.directUpload').find("input:file").each((i, elem) => {
      let fileInput    = $(elem),
        form         = $(fileInput.parents('form:first')),
        submitButton = form.find('#submit_btn'),
        backButton   = form.find('#back_btn'),
        progressBar  = $("\<div class='bar'>\</div>"),
        barContainer = $("\<div class='div_progress'>\</div>").append(progressBar);

      fileInput.after(barContainer);
      fileInput.fileupload({
        url:              this.props.customers.s3_aws.url,
        type:             'POST',
        autoUpload:       true,
        formData:         this.props.customers.s3_aws.form_data,
        paramName:        'file',
        dataType:         'XML',
        replaceFileInput: false,
      progressall: function (e, data) {
        let progress = parseInt(data.loaded / data.total * 100, 10);
        progressBar.css('width', progress + '%').text(`${progress} %`)
      },
      start: function (e) {
        // submitButton.prop('disabled', true);
        backButton.prop('disabled', true);

        progressBar.
          css({'background':'#29B6F6', 'display':'block', 'width':'0%'});
      },
      done: (e, data) => {
        // submitButton.prop('disabled', false);
        backButton.prop('disabled', false);
        progressBar.text("Uploading done");
        let key   = $(data.jqXHR.responseXML).find("Key").text();
        let url   = `${data.url}/${key}`;
        this.setState({
          plan_url: url
        }, () => {this.isDisabled();});
      },
      fail: function(e, data) {
        submitButton.prop('disabled', false);

        progressBar.
          css("background", "red").
          text("Failed");
       }
     });
   });
  }

  onSubmitClick(e) {
    e.preventDefault();
    const arr = this.props.customers &&
      this.props.customers.floor_plans.map( el => (el.name));

    if ( arr.includes(this.state.name)) {
      this.setState({
        name_class: 'form-group has-error',
        name_error_message: 'Not unique name'
      });
    } else {
      const floor_plan = {
        name: this.state.name,
        floor: this.state.floor,
        location_id: this.state.location_id,
        plan_url: this.state.plan_url
      };
      this.props.createFloorPlan(floor_plan).then(() => {
        this.setState({
          name: '',
          floor: '',
          location_id: '',
          clicked: false
        });
        flashMessage('Floor Plan was successfully created');
      });
    }
  }

  render() {
    const custom_file_upload = {
      border: '1px solid #ccc',
      display: 'inline-block',
      padding: '6px 12px',
      cursor: 'pointer',
      borderRadius: '4px',
      background: '#fff'
    };
    const hidden = {
      display: 'none'
    };
    return (

      <div className="well">
        {
          this.state.clicked ?
          <form className='directUpload'>
          {
            this.state.name_error_message !== ''  ?
            <div className="alert alert-danger alert-dismissable">
              <h5><b>Please review the problems below:</b></h5>
              <h5>1 error prohibited this Floor Plan from being saved</h5>
              <ol style={{margin: 0}}>
                <li>{this.state.name_error_message}</li>
              </ol>
            </div> : null
          }
            <div className={this.state.name_class}>
              <label className="control-label">Name : </label>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Name"
                value={this.state.name}
                onChange={(event) => this.onInputChange('name', event) } />
            </div>
            <div className="form-group">
              <label className="control-label">Floor : </label>
              <input
                type="text"
                name="floor"
                className="form-control"
                placeholder="Floor"
                value={this.state.floor}
                onChange={(event) => this.onInputChange('floor', event) } /></div>
            <div className="form-group">
              <label htmlFor="file-upload" style={custom_file_upload} >
                <i className="fa fa-cloud-upload"></i> Choose File
              </label>
              <input type="file" className="form-control" id="file-upload" value={this.state.plan} style={hidden} />
            </div>
            <div className="form-group">
              <select
                name="location"
                className="form-control"
                value={this.state.location_id}
                onChange={(event) => this.onInputChange('location_id', event) } >
                  <option value={0}>Please select</option>
                  {
                    this.props.customers.result.map((el, key) => {
                      return (
                        <option key={key} value={el.location_id}>{el.name} / {el.address}</option>
                      );
                    })
                  }
              </select>
            </div>
            <button className="btn btn-custom4" id="back_btn"
              onClick={(e) => {
                this.clearUpdate(e);
                this.props.clearUpdate(e);
                this.onButtonClick(e);}}>
                Close
            </button> &nbsp;
            <button disabled={this.state.disabled}
              className="btn btn-custom4" id="submit_btn"
              onClick={(e) => this.state.action === 'Create' ?
              this.onSubmitClick(e) : this.onUpdateSubmitClick(e)
            }>{this.state.action}</button>
          </form>
          :
          <button className="btn btn-custom4" onClick={(e) => {
            this.onButtonClick(e);
          }}>New FP</button>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    customers: state.floorPlanCustomers
  };
};

export default connect(mapStateToProps, {createFloorPlan, updateFloorPlan})(AddFloorPlan);
