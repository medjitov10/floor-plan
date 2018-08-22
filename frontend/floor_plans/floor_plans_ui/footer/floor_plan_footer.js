import React, { Component } from 'react';
import axios from 'axios';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { SketchPicker } from 'react-color';

import FloorPlanFooterCategory from './floor_plan_footer_category';
import FloorPlanFooterType from './floor_plan_footer_type';
import FloorPlanLineCategories from './floor_plan_line_categories';
import { categoryHelper, typeHelper } from './helper.js';

class FloorPlanFooter extends Component {
  state = {
    popUpClass: 'floor-plan-add-icon',
    categorys: [],
    type: [],
    open: false,
    typeClass: 'floor_plan-ui-footer-addType-close',
    typeName: '',
    disabled: false,
    background: 'black',
  };

  componentWillMount() {
    this.setState({
      categorys: this.props.category,
      pdf_url: this.props.pdf_url
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ popUpClass: 'floor-plan-add-icon',
      categorys: [],
      type: [],
      open: false,
      typeClass: 'floor_plan-ui-footer-addType-close',
      typeName: '',
      pdf_url: nextProps.pdf_url
    });
  }

  onAddClick() {
    clearInterval(this.timer);
    this.setState({categorys: []}, () => {
      if ( this.state.open ) {
        var categorys = categoryHelper();

        this.timer = setInterval( () => {
          if (categorys.length && this.state.open) {
            this.setState({categorys: this.state.categorys.concat([categorys.shift()])});
          } else {
            clearInterval(this.timer);
          }
        }, 100);
        this.setState({popUpClass: 'floor-plan-add-icon-pop-up'});

      } else {
        this.setState({popUpClass: 'floor-plan-add-icon', categorys: []});
      }
    });
  }

  callback() {
    axios.get(`/callback/${this.props.slug}`).then( data => {
      if ( this.props.pdf_url !== data.data.pdf_url) {
        this.setState({disabled: false, pdf_url: data.data.pdf_url});
      } else {
        clearInterval(this.loop);
        this.loop = setInterval( () => this.callback() ,2000);
      }
    });
  }

  generatePdf = () => {
    if (!this.state.disabled) {
      axios.post(`/floorplans/${this.props.slug}`, {}).then( () => {
        setTimeout(() => this.callback(), 5000);
      });
    }
    this.setState({disabled: true});
  }

  categoryType = (name) => {
    if (this.state.typeName === name  ) {
      let type = '';
      this.setState({typeName: name});
      if ( this.state.typeClass === 'floor-plans-ui-footer-addType-pop-up' ) {
        type = 'floor_plan-ui-footer-addType-close';
        this.setState({typeClass: type, type: []});
      } else {
        type = 'floor-plans-ui-footer-addType-pop-up';
        this.setState({
          typeClass: type,
          typeName: name
        });
        setTimeout( () => {
          this.setState({type: typeHelper().filter(el => el.category === name) });
        }, 500);
      }
    } else {
      let type = '';
      if ( this.state.typeClass !== 'floor-plans-ui-footer-addType-pop-up' ) {
        type = 'floor-plans-ui-footer-addType-pop-up';
        this.setState({
          typeClass: type,
          typeName: name
        });
        setTimeout( () => {
          this.setState({type: typeHelper().filter(el => el.category === name) });
        }, 500);
      } else {
        type = 'floor-plans-ui-footer-addType-pop-up';
        this.setState({
          typeClass: type,
          typeName: name,
          type: typeHelper().filter(el => el.category === name)
        });
      }
    }
  }


  render() {
    const {categorys, type} = this.state;
    return (
      <div className='floor-plans-ui-footer' onClick={ (e) => e.stopPropagation()}>
        <i
          onClick={(e) => {
              e.stopPropagation();
              this.setState({open: !this.state.open},
              () => this.onAddClick());
            }
            }
          className="fa fa-lg fa-plus-circle floor-plan-footer-icon"
          aria-hidden="true"
        >
        </i>
        <i
          className="fa fa-paint-brush floor-plan-footer-icon"
          onClick={(e) => {
            e.stopPropagation();
            this.props.segmentFlag ?
            this.props.onSegmentButtonClick(null) :
            this.props.onLineClickToggle();
          }}
          style={{color: this.props.segmentFlag ? 'lightblue' : 'white'}}
        >
        </i>
        <i
          style={{
            color: 'white',
            margin: '5px 10px 0 0',
            fontSize: '20px',
            float: 'right'
          }}
          onClick={ () => this.props.history.push('/floor_plans')}
          className="fa fa-times"></i>
        {
          this.state.disabled ?
          <i
            className="fa fa-spinner fa-lg"
            style={{
              color: 'white',
              margin: '10px 10px 0 0',
              float: 'right'
            }}
          /> :
          <a href={this.state.pdf_url}>
            <i
              className="fa fa-file-pdf-o fa-lg"
              style={{
                color: 'white',
                margin: '10px 10px 0 0',
                float: 'right'
              }}
            />
          </a>
        }
        <i onClick={this.generatePdf} className="fa fa-upload"
          style={{
            color: this.state.disabled ? '#a8a8a8' : 'white',
            margin: '5px 10px 0 0',
            fontSize: '18px',
            float: 'right'
          }}
        />
        <i
          onClick={
            e => {
              e.stopPropagation();
              this.props.toggleCallback();
            }
          }
          style={{
            transition: '.5s',
            transform: `rotateZ(${this.props.toggle ? '180deg' : 0})`,
            color: 'white',
            margin: '8px 10px 0 0',
            fontSize: '20px',
            float: 'right'
          }}
          className="fa fa-lg fa-angle-double-right"
          aria-hidden="true"
        />
        <div
          style={{
            background: this.state.background,
            width: '16px',
            height: '16px',
            position: 'absolute',
            top: '8px',
            left: '78px',
            border: this.props.onColorClick ? '1px solid #94F0AE' : '1px solid #FFF'
          }}
          onClick={this.props.onColorClickToggle}
        >
          {
            this.props.onColorClick ?
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'absolute',
                zIndex: '1',
                bottom: 'calc(100% + 10px)',
                left: '10%'
              }}
            >
              <SketchPicker
                onChangeComplete={(color) => {
                  this.props.onColorChange(color.hex);
                  this.setState({background: color.hex})
                }}
                color={this.state.background}
              />
            </div> : null
          }
        </div>
        <div className={`${this.state.popUpClass} floor-plans-add`}>
          <ReactCSSTransitionGroup
            transitionName="footer-category"
            transitionEnterTimeout={100}
            transitionLeaveTimeout={100}
          >
            {
              categorys.map((el, index) => (
                <FloorPlanFooterCategory
                  key={index}
                  categoryType={this.categoryType}
                  name={el[0]}
                  icon={el[1]}/>
                )
              )
            }
          </ReactCSSTransitionGroup>
        </div>
        <div className={`${this.state.typeClass} floor-plans-ui-footer-addType`}>
          {
            type.map((el, index) => (
              <FloorPlanFooterType
                key={index}
                element={el}
                slug={this.props.slug}
              />
            ))
          }
        </div>
        <div
          className='floor-plan-ui-footer-line-category'
          style={{
            height: this.props.onLineClick ? '135px' : '0px',
            paddingTop: this.props.onLineClick ? '5px' : '0px',
            overflow: 'hidden',
            border: this.props.onLineClick ? '1px solid black' : 'none'
          }}
        >
          <FloorPlanLineCategories
            onLineClickToggle={this.props.onLineClickToggle}
            onLineClick={this.props.onLineClick}
            onSegmentButtonClick={this.props.onSegmentButtonClick}
          />
        </div>
      </div>
    );
  }
}

export default FloorPlanFooter;
