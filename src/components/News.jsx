import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Select, Typography, Row, Col, Avatar, Card,
} from 'antd';
import moment from 'moment';
import { useGetNewsQuery } from '../services/newsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';
import Loader from './Loader';

const { Title, Text } = Typography;
const { Option } = Select;
const demoImage = 'http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg';

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
  const { data: cryptoNews, isFetching } = useGetNewsQuery({
    newsCategory, count: simplified ? 6 : 12,
  });
  const { data } = useGetCryptosQuery(100);

  if (isFetching) return <Loader />;

  return (
    <>
      <Row gutter={[24, 24]}>
        {!simplified && (
          <Col span={24}>
            <Select
              showSearch
              className="select-news"
              placeholder="Select a Crypto"
              optionFilterProp="children"
              onChange={(value) => setNewsCategory(value)}
              filterOption={(input, option) => {
                option.children.toLowerCase().indexOf(input.toLowerCase() >= 0);
              }}
            >
              <Option value="Cryptocurrency">Cryptocurrency</Option>
              {data?.data?.coins.map((coin) => (
                <Option value={coin.name} key={coin.id}>{coin.name}</Option>
              ))}
            </Select>
          </Col>
        )}
        {cryptoNews.value?.map((news) => (
          <Col xs={24} sm={12} lg={8} key={news.url}>
            <Card hoverable className="news-card">
              <a href={news.url} target="_blank" rel="noreferrer">
                <div className="news-image-container">
                  <Title className="news-title" level={4}>
                    {news.name.length > 50 ? `${news.name.substring(0, 50)}...` : news.name}
                  </Title>
                  <img
                    src={news?.image?.thumbnail?.contentUrl || demoImage}
                    alt="news"
                    className="news-img"
                  />
                </div>
                <p>
                  {news.description.length > 140 ? `${news.description.substring(0, 140)}...` : news.description}
                </p>
                <div className="provider-container">
                  <div className="flex align-i-center">
                    <Avatar src={news?.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="" />
                    <Text className="provider-name">{news.provider[0]?.name}</Text>
                  </div>
                  <Text className="flex align-s-center">{moment(news.datePublished).startOf('ss').fromNow()}</Text>
                </div>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

News.propTypes = {
  simplified: PropTypes.bool,
};

News.defaultProps = {
  simplified: false,
};

export default News;
