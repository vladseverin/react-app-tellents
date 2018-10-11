import React, { Component } from 'react';

class TalentBox extends Component {
  render() {
    const { data } = this.props;

    return (
      <div className="job-box">

        <div className="job-box-header">
          <div className="job-box-photo">
            <img
              className='img-circle'
              src={data.image.url}
              alt="" />
          </div>
          <div className="job-box-title">
            {data.full_name}
          </div>
          <div className="job-box-rate">
            <span className="icon icon-star-full"></span>
            <span>{data.total_rate !== 0 ? data.total_rate : 'N/A'}</span>
          </div>
        </div>

        <div className="job-box-body">
          <div className="job-box-tips">
            <div className="tip">
              <span className="icon icon-award"></span>
              <span className="text">95%</span>
            </div>
            <div className="tip">
              <span className="icon icon-jobs"></span>
              <span className="text">N/A</span>
            </div>
            <div className="tip">
              <span className="icon icon-location"></span>
              <span className="text">N/A</span>
            </div>
            <div className="tip">
              <span className="icon icon-clock-1"></span>
              <span className="text">N/A</span>
            </div>
            <div className="tip">
              <span className="icon icon-wallet"></span>
              <span className="text">N/A</span>
            </div>
          </div>
          <div className="job-box-deskr">
            <div className="text">
              No Introduction set yet
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
            {data.promotions.length !== 0 
              ? <React.Fragment>
                  <div>{data.promotions[0].title} </div>
                  <div className="description">{data.promotions[0].description}</div>
                </React.Fragment> 
              : 'The user has not promoted himself yet'
            }
          </div>
          <button className='btn btn-skill-test btn-blue'>Free</button>
        </div>

      </div>
    );
  }
}

export default TalentBox;
