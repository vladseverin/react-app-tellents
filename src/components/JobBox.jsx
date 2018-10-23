import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

class JobBox extends Component {
  static propTypes = {
    data: PropTypes.shape({
      categories: PropTypes.oneOfType([
        PropTypes.arrayOf(
          PropTypes.object
        ),
        PropTypes.bool,
      ]).isRequired,
      created_at: PropTypes.string.isRequired,
      description: PropTypes.string,
      have_bid: PropTypes.bool.isRequired,
      id: PropTypes.number.isRequired,
      offers: PropTypes.array.isRequired,
      owner: PropTypes.bool.isRequired,
      period: PropTypes.number,
      period_type: PropTypes.string,
      price: PropTypes.number,
      privacy: PropTypes.string,
      promotion_description: PropTypes.string,
      promotion_title: PropTypes.string,
      skill_tags: PropTypes.array.isRequired,
      status: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      user: PropTypes.object.isRequired,
    }).isRequired,
  }

  render() {
    const { data } = this.props;
    const timeType = data.time_type ? data.time_type.split('_').join(' ') : false;
    const periodType = data.period_type 
      ? data.period + data.period_type.slice(0, 1).toUpperCase() 
      : false;
    const level = data.level ? data.level.slice(0, 3) : false;

    return (
      <div className="job-box">

        <div className="job-box-header">
          <div className="job-box-title block-time">
            <div className="post-date">
              {moment(data.user.last_seen_at, "YYYYMMDD").fromNow()}
            </div>
            <div className="job-title">
              {data.title}
            </div>
          </div>

          <div className="panel-default">
            <div className="user-profil">
              <div className="job-box-photo">
                <img
                  className='img-circle'
                  src={data.user.image.url}
                  alt="" />
              </div>
              <div className="award">
                <span className="icon icon-badge-flat"><span className="path1"></span><span className="path2"></span><span className="path3"></span><span className="path4"></span><span className="path5"></span><span className="path6"></span><span className="path7"></span><span className="path8"></span><span className="path9"></span><span className="path10"></span></span>
              </div>
              <div className="job-box-rate">
                <span className="icon icon-star-full"></span>
                <span>{data.user.total_rate !== 0 ? data.user.total_rate : 'N/A'}</span>
              </div>
            </div>

            <div className="user-name">
              {data.user.full_name}
            </div>
          </div>
        </div>

        <div className="job-box-body rotate-body">
          <div className="job-box-tips rotate-tips">
            <div className="tip">
              <span className="icon icon-location"></span>
              <span className="text">N/A</span>
            </div>
            <div className="tip">
              <span className="icon icon-clock-1"></span>
              <span className="text">N/A</span>
            </div>
            <div className="tip">
              <span className="icon icon-award"></span>
              <span className="text">{level || 'N/A'}</span>
            </div>


            <div className="tip">
              <span className="icon icon-timer"></span>
              <span className="text">{periodType || 'N/A'}</span>
            </div>
            <div className="tip">
              <span className="icon icon-clock-1"></span>
              <span className="text">{timeType || 'N/A'}</span>
            </div>

          </div>
          <div className="job-box-deskr">
            <div className="text">
              {data.description}
            </div>

            <div className="skill-tags-block">
              {
                //в редьюсе фильтруем повторные объекты
                data.skill_tags
                  .reduce((obj, e1) => {
                    const matches = obj.filter(e2 => e1.id === e2.id);
                    matches.length === 0 ? obj.push(e1) : null;
                    return obj;
                  }, [])
                  .map(el => {
                    return (
                      <div key={el.id} className='skill-tag'>
                        {el.name}
                      </div>
                    );
                  })
              }
            </div>

          </div>
        </div>

        <div className="job-box-footer">
          <div className="additional-info">
            {data.promotion_title ?
              <React.Fragment>
                <div className="title">{data.promotion_title} </div>
                <div className="description">{data.promotion_description}</div>
              </React.Fragment>
              : 'There is no skill test'
            }
          </div>
          <button className='btn btn-skill-test btn-blue'>Free</button>
        </div>

      </div>
    );
  }
}

export default JobBox;
