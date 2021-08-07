import React from 'react';
import { MainDataWrapper } from './ShowMainData.styled';
import { Headline } from './ShowMainData.styled';
import { TagList } from './ShowMainData.styled';

import IMG_PLACEHOLDER from '../../images/not-found.png';
import { Star } from '../styled';

const ShowMainData = ({ name, rating, summary, tags, image }) => {
  return (
    <MainDataWrapper>
      <img src={image ? image.original : IMG_PLACEHOLDER} alt="show-cover" />
      <div className="text-side">
        <Headline>
          <h1>{name}</h1>
          <div>
            <Star />
            <span>{rating.average || 'N/A'}</span>
          </div>
        </Headline>
        <div
          className="summary"
          dangerouslySetInnerHTML={{ __html: summary }}
        />

        <TagList>
          Tags:{' '}
          <div>
            {tags.map((tag, i) => (
              <span key={i}>{tag}</span>
            ))}
          </div>
        </TagList>
      </div>
    </MainDataWrapper>
  );
};
export default ShowMainData;
