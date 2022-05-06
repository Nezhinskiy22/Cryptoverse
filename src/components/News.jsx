import { Card, Col, Row, Select, Typography } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import moment from "moment";
import React, { useState } from "react";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { useGetCryptoNewsQuery } from "../services/CryptoNewsApi";

const { Text, Title } = Typography;
const { Option } = Select;

const demoImg =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");

  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 12,
  });

  const { data } = useGetCryptosQuery(100);

  if (!cryptoNews?.value) return "Loading...";

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a new Crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) =>
              option.children
                .toLowerCase()
                .inDexOf(input.toLocaleLowerCase() >= 0)
            }
          >
            <Option value="Cryptocurrency">Cryptocurrency</Option>
            {data?.data?.coins.map((coin) => (
              <Option value={coin.name}>{coin.name}</Option>
            ))}
          </Select>
        </Col>
      )}
      {cryptoNews.value.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blanc" rel="norefered">
              <div className="news-image-container">
                <Title className="news-title" level={4}>
                  {news.name}
                </Title>
                <img
                  src={news?.image?.thumbnail?.contentUrl || demoImg}
                  alt="news"
                  style={{ maxWidth: "200px", maxHeight: "100px" }}
                />
              </div>
              <p>
                {news.description > 100
                  ? `${news.description.substring(0, 100)}...`
                  : news.description}
              </p>
            </a>
            <div className="provider-container">
              <div>
                <Avatar
                  src={
                    news.provider[0]?.image?.thumbnail?.contentUrl || demoImg
                  }
                  alt="news"
                />
                <Text className="provider-name">{news.provider[0]?.name}</Text>
              </div>
              <Text>{moment(news.datePublished).startOf("ss").fromNow()}</Text>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
