import React, { useState } from 'react';
import ActionModal from './ActionModal';
import './InsightsPanel.css';

const InsightsPanel = () => {
  const [selectedInsight, setSelectedInsight] = useState(null);
  const insights = [
    {
      id: 1,
      type: 'insight',
      title: 'Louis Vuitton Q4 Revenue Surge',
      description: 'Asia-Pacific sales up 28% - highest quarterly growth this year',
      time: '2 hours ago',
      category: 'Fashion & Leather',
      icon: '👜',
      label: 'Louis Vuitton Q4 Revenue Surge',
      details: 'Louis Vuitton has achieved exceptional performance in Q4 with Asia-Pacific sales surging 28% year-over-year. The growth is primarily driven by strong demand in mainland China (+35%), Hong Kong (+24%), and Japan (+22%). Key product lines contributing to this growth include the Neverfull collection (+42%), Speedy collection (+31%), and the Capucines handbag line (+38%). This represents the highest quarterly growth rate in the region over the past 18 months. Digital channels have also shown remarkable growth with e-commerce sales up 45% in the region.',
      trend: 'positive',
      metric: '+28%'
    },
    {
      id: 2,
      type: 'alert',
      title: 'Dior Stock Alert',
      description: 'Lady Dior collection low inventory in 8 European stores',
      time: '4 hours ago',
      category: 'Inventory',
      icon: '⚠️',
      label: 'Dior Stock Alert - Immediate Action Required',
      details: 'Critical inventory shortage detected for the iconic Lady Dior collection across 8 major European boutiques. Affected locations: Paris Avenue Montaigne, London Bond Street, Milan Via Montenapoleone, Rome Via Condotti, Madrid Calle Serrano, Barcelona Passeig de Gràcia, Berlin Kurfürstendamm, and Munich Maximilianstrasse. Current stock levels are at 15% of optimal inventory, with some sizes and colors completely sold out. Customer demand continues to exceed supply forecasts by 45%. Estimated time to replenishment: 3-4 weeks. Recommend immediate inventory reallocation from Asia-Pacific stores where stock levels are at 120% capacity.',
      trend: 'warning',
      metric: '8 stores'
    },
    {
      id: 3,
      type: 'news',
      title: 'New Sephora Collection Launch',
      description: 'Exclusive collaboration with Fenty Beauty debuts next month',
      time: '6 hours ago',
      category: 'Product Launch',
      icon: '💄',
      label: 'Sephora x Fenty Beauty Exclusive Launch',
      details: 'Sephora announces an exclusive collaboration with Fenty Beauty by Rihanna, set to debut next month across all global markets. The limited-edition collection features 25 new products including foundation shades, lip colors, and highlighters designed specifically for Sephora\'s diverse customer base. Pre-launch buzz on social media has already generated 4.2M impressions and 580K engagements. Celebrity partnerships and influencer collaborations are lined up for the launch campaign. Early projections suggest this could be one of the biggest beauty launches of the year, with expected first-week sales of €15M+ globally.',
      trend: 'positive',
      metric: '25 products'
    },
    {
      id: 4,
      type: 'insight',
      title: 'Moët & Chandon Sales Exceed Target',
      description: 'Grand Vintage collection outperforming forecast by 35%',
      time: '1 day ago',
      category: 'Wines & Spirits',
      icon: '🥂',
      label: 'Moët & Chandon Exceptional Performance',
      details: 'Moët & Chandon\'s Grand Vintage collection is significantly outperforming sales forecasts, exceeding targets by 35% this quarter. The premium champagne line has resonated exceptionally well with consumers in key markets including Asia-Pacific (+42%), Europe (+31%), and Americas (+28%). The success is attributed to effective luxury positioning, celebrity endorsements, and exclusive partnerships with high-end restaurants and hotels. Average selling price has increased by 18% while maintaining strong volume growth. Holiday season pre-orders are tracking 45% above last year, indicating continued momentum into Q1 next year.',
      trend: 'positive',
      metric: '+35%'
    },
    {
      id: 5,
      type: 'news',
      title: 'TAG Heuer Partnership',
      description: 'New ambassador program announced with Formula 1 drivers',
      time: '1 day ago',
      category: 'Brand Marketing',
      icon: '⌚',
      label: 'TAG Heuer Expands Formula 1 Partnerships',
      details: 'TAG Heuer announces an expanded ambassador program featuring top Formula 1 drivers for the upcoming racing season. The partnership includes exclusive timepiece designs co-created with racing champions, behind-the-scenes content, and special edition releases tied to major racing events. This strategic move reinforces TAG Heuer\'s heritage in motorsports and targets affluent male consumers aged 30-50. The announcement has generated significant media coverage with an estimated reach of 85M+ impressions globally. Pre-registration for limited edition watches has already exceeded 12,000 sign-ups within 24 hours of announcement.',
      trend: 'positive',
      metric: 'F1 Partnership'
    },
    {
      id: 6,
      type: 'insight',
      title: 'Sustainable Luxury Trending',
      description: 'Stella McCartney conscious collections up 45% year-over-year',
      time: '2 days ago',
      category: 'Sustainability',
      icon: '🌱',
      label: 'Sustainable Luxury Market Growth',
      details: 'Consumer demand for sustainable luxury products has surged 45% year-over-year across all LVMH houses. Stella McCartney leads this trend with conscious collections showing exceptional growth. Millennials and Gen-Z consumers (ages 25-40) are driving this shift, with 67% stating sustainability is a key factor in luxury purchase decisions. Other LVMH brands are responding: Louis Vuitton\'s recycled materials line (+38%), Loro Piana\'s organic cashmere (+42%), and Rimowa\'s sustainable luggage collection (+35%) all showing strong performance. This trend is expected to continue, with sustainable luxury projected to grow at 25% annually through 2026.',
      trend: 'positive',
      metric: '+45%'
    },
    {
      id: 7,
      type: 'news',
      title: 'Bulgari Flagship Opening',
      description: 'New boutique opening in Dubai Mall - largest in Middle East',
      time: '2 days ago',
      category: 'Retail Expansion',
      icon: '💎',
      label: 'Bulgari Opens Largest Middle East Flagship',
      details: 'Bulgari celebrates the grand opening of its largest boutique in the Middle East at The Dubai Mall. The 450 square meter flagship store features exclusive high jewelry collections, watches, leather goods, and fragrances. The boutique includes private VIP shopping suites with dedicated personal shoppers and a bespoke jewelry customization studio. The Middle East market represents significant growth potential for Bulgari, with regional sales up 52% year-over-year. The new flagship is expected to generate €25M+ in annual revenue and positions Bulgari for continued expansion in the Gulf region.',
      trend: 'positive',
      metric: '450 sqm'
    },
    {
      id: 8,
      type: 'insight',
      title: 'Hennessy Market Leadership',
      description: 'Premium cognac market share reaches 42% in North America',
      time: '3 days ago',
      category: 'Market Position',
      icon: '🥃',
      label: 'Hennessy Dominates North American Market',
      details: 'Hennessy has solidified its market leadership position with a commanding 42% share of the premium cognac segment in North America. This represents a 5 percentage point increase from the previous year, outpacing all major competitors. Growth drivers include successful celebrity partnerships (particularly in hip-hop culture), limited edition releases (V.S.O.P Privilège), and strategic distribution expansion in urban markets. The brand has particularly resonated with diverse consumer demographics, with strong growth among African-American (+48%) and Hispanic (+38%) communities. Digital marketing campaigns have generated 120M+ impressions, and Hennessy\'s brand value has increased 23% year-over-year.',
      trend: 'positive',
      metric: '42% share'
    }
  ];

  const getTypeColor = (type) => {
    switch(type) {
      case 'alert':
        return '#D4AF37';
      case 'insight':
        return '#000000';
      case 'news':
        return '#666666';
      default:
        return '#000000';
    }
  };

  const handleInsightClick = (insight) => {
    setSelectedInsight(insight);
  };

  const handleCloseModal = () => {
    setSelectedInsight(null);
  };

  return (
    <>
      <div className="insights-panel">
        <div className="insights-panel-header">
          <h3 className="insights-panel-title">Latest Insights & News</h3>
          <p className="insights-panel-subtitle">Stay informed with real-time updates</p>
        </div>
        
        <div className="insights-panel-content">
          {insights.map((item) => (
            <div 
              key={item.id} 
              className="insight-item"
              style={{ borderLeftColor: getTypeColor(item.type) }}
              onClick={() => handleInsightClick(item)}
            >
              <div className="insight-item-header">
                <span className="insight-item-icon">{item.icon}</span>
                <span className="insight-item-category">{item.category}</span>
              </div>
              <h4 className="insight-item-title">{item.title}</h4>
              <p className="insight-item-description">{item.description}</p>
              <span className="insight-item-time">{item.time}</span>
            </div>
          ))}
        </div>
      </div>

      {selectedInsight && (
        <ActionModal 
          insight={selectedInsight}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default InsightsPanel;

