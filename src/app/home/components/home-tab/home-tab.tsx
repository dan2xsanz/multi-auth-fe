'use client'
import React, { Fragment, useState } from 'react'
import './home-tab.css'
import { Avatar, Image } from '@nextui-org/react'
export const HomeTab = () => {
  // Sample array of items
  const items = [
    'Apple',
    'Banana',
    'Orange',
    'Grape',
    'Apple',
    'Banana',
    'Orange',
    'Grape',
    'Apple',
    'Banana',
    'Orange',
    'Grape',
    'Apple',
    'Banana',
    'Orange',
    'Grape',
    'Apple',
    'Banana',
    'Orange',
    'Grape',
    'Orange',
  ]

  const categoryList = [
    'Shoes',
    'Jackets',
    'Hoodies & Sweatshirts',
    'Trouser & Tights',
    'Shorts',
    'Tops & Shirts',
    'Tracksuite',
    'Socks',
    'Accessories & Equipment',
  ]

  const [hoveredIndex, setHoveredIndex] = useState<number | undefined>(
    undefined,
  )

  return (
    <Fragment>
      <div className='market-place-left-container'>
        <div className='title-container-1'>Products Available</div>
        <div className='market-place-product-categories-container'>
          <ul>
            {categoryList.map((item, index) => (
              <li className='category-item-style' key={index}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className='market-place-center-container'>
        <div className='title-container-2-link'>
          <div style={{ fontWeight: 'bold' }}>New & Featured</div>
          <div>Men</div>
          <div>Women</div>
          <div>Kids</div>
          <div>Sale</div>
          <div>Best Sellers</div>
        </div>
        <div className='scrollable-center-container'>
          {items.map((item: string, index: number) => (
            <div key={item} className='image-main-container'>
              <div
                className='image-container'
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(undefined)}
              >
                <Image
                  isZoomed
                  className='image-style'
                  radius='none'
                  alt='NextUI hero Image with delay'
                  src='https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/8fb34fe2-cc91-4865-9fa6-79b3b26b8ac7/pegasus-41-road-running-shoes-RZm89S.png'
                />
              </div>
              {hoveredIndex === index && (
                <div
                  key={item}
                  className='image-detail-container'
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(undefined)}
                >
                  <div className='image-price-label-container'>₱100,595</div>
                  <div className='image-name-label-container'>
                    Sample Product Name
                  </div>
                  <div className='image-name-label-container'>
                    Sample Supporting Details
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className='market-place-right-container'>
        <div className='title-container-1'>Online</div>
        <div className='scrollable-right-container'>
          <div className='message-container'>
            <Avatar
              size='sm'
              isBordered
              color='success'
              src='https://scontent.filo1-1.fna.fbcdn.net/v/t39.30808-6/447232753_822138273124293_1427859901252616171_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGy1iW-53mgIpBdjwlBFWgI9aLNvUZSo4r1os29RlKjisel-M7o6K4ye6XTyoU1WCiXq_wQrZMtBRF16GdIHaqs&_nc_ohc=JwmXfGhaXjAQ7kNvgEAG4dK&_nc_ht=scontent.filo1-1.fna&oh=00_AYAvwqKWm8GJgt3XdpRj7afBw5PoAc_fQ6S1dT3HJhxxwA&oe=666B73EA'
            />
            <div className='message-name-container'>Dan Lester Sanz</div>
          </div>
          <div className='message-container'>
            <Avatar
              size='sm'
              isBordered
              color='success'
              src='https://scontent.filo1-1.fna.fbcdn.net/v/t39.30808-6/447232753_822138273124293_1427859901252616171_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGy1iW-53mgIpBdjwlBFWgI9aLNvUZSo4r1os29RlKjisel-M7o6K4ye6XTyoU1WCiXq_wQrZMtBRF16GdIHaqs&_nc_ohc=JwmXfGhaXjAQ7kNvgEAG4dK&_nc_ht=scontent.filo1-1.fna&oh=00_AYAvwqKWm8GJgt3XdpRj7afBw5PoAc_fQ6S1dT3HJhxxwA&oe=666B73EA'
            />
            <div className='message-name-container'>Dan Lester Sanz</div>
          </div>
          <div className='message-container'>
            <Avatar
              size='sm'
              isBordered
              color='success'
              src='https://scontent.filo1-1.fna.fbcdn.net/v/t39.30808-6/447232753_822138273124293_1427859901252616171_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGy1iW-53mgIpBdjwlBFWgI9aLNvUZSo4r1os29RlKjisel-M7o6K4ye6XTyoU1WCiXq_wQrZMtBRF16GdIHaqs&_nc_ohc=JwmXfGhaXjAQ7kNvgEAG4dK&_nc_ht=scontent.filo1-1.fna&oh=00_AYAvwqKWm8GJgt3XdpRj7afBw5PoAc_fQ6S1dT3HJhxxwA&oe=666B73EA'
            />
            <div className='message-name-container'>Dan Lester Sanz</div>
          </div>
          <div className='message-container'>
            <Avatar
              size='sm'
              isBordered
              color='success'
              src='https://scontent.filo1-1.fna.fbcdn.net/v/t39.30808-6/447232753_822138273124293_1427859901252616171_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGy1iW-53mgIpBdjwlBFWgI9aLNvUZSo4r1os29RlKjisel-M7o6K4ye6XTyoU1WCiXq_wQrZMtBRF16GdIHaqs&_nc_ohc=JwmXfGhaXjAQ7kNvgEAG4dK&_nc_ht=scontent.filo1-1.fna&oh=00_AYAvwqKWm8GJgt3XdpRj7afBw5PoAc_fQ6S1dT3HJhxxwA&oe=666B73EA'
            />
            <div className='message-name-container'>Dan Lester Sanz</div>
          </div>
          <div className='message-container'>
            <Avatar
              size='sm'
              isBordered
              color='success'
              src='https://scontent.filo1-1.fna.fbcdn.net/v/t39.30808-6/447232753_822138273124293_1427859901252616171_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGy1iW-53mgIpBdjwlBFWgI9aLNvUZSo4r1os29RlKjisel-M7o6K4ye6XTyoU1WCiXq_wQrZMtBRF16GdIHaqs&_nc_ohc=JwmXfGhaXjAQ7kNvgEAG4dK&_nc_ht=scontent.filo1-1.fna&oh=00_AYAvwqKWm8GJgt3XdpRj7afBw5PoAc_fQ6S1dT3HJhxxwA&oe=666B73EA'
            />
            <div className='message-name-container'>Dan Lester Sanz</div>
          </div>
          <div className='message-container'>
            <Avatar
              size='sm'
              isBordered
              color='success'
              src='https://scontent.filo1-1.fna.fbcdn.net/v/t39.30808-6/447232753_822138273124293_1427859901252616171_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGy1iW-53mgIpBdjwlBFWgI9aLNvUZSo4r1os29RlKjisel-M7o6K4ye6XTyoU1WCiXq_wQrZMtBRF16GdIHaqs&_nc_ohc=JwmXfGhaXjAQ7kNvgEAG4dK&_nc_ht=scontent.filo1-1.fna&oh=00_AYAvwqKWm8GJgt3XdpRj7afBw5PoAc_fQ6S1dT3HJhxxwA&oe=666B73EA'
            />
            <div className='message-name-container'>Dan Lester Sanz</div>
          </div>
          <div className='message-container'>
            <Avatar
              size='sm'
              isBordered
              color='success'
              src='https://scontent.filo1-1.fna.fbcdn.net/v/t39.30808-6/447232753_822138273124293_1427859901252616171_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGy1iW-53mgIpBdjwlBFWgI9aLNvUZSo4r1os29RlKjisel-M7o6K4ye6XTyoU1WCiXq_wQrZMtBRF16GdIHaqs&_nc_ohc=JwmXfGhaXjAQ7kNvgEAG4dK&_nc_ht=scontent.filo1-1.fna&oh=00_AYAvwqKWm8GJgt3XdpRj7afBw5PoAc_fQ6S1dT3HJhxxwA&oe=666B73EA'
            />
            <div className='message-name-container'>Dan Lester Sanz</div>
          </div>
          <div className='message-container'>
            <Avatar
              size='sm'
              isBordered
              color='success'
              src='https://scontent.filo1-1.fna.fbcdn.net/v/t39.30808-6/447232753_822138273124293_1427859901252616171_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGy1iW-53mgIpBdjwlBFWgI9aLNvUZSo4r1os29RlKjisel-M7o6K4ye6XTyoU1WCiXq_wQrZMtBRF16GdIHaqs&_nc_ohc=JwmXfGhaXjAQ7kNvgEAG4dK&_nc_ht=scontent.filo1-1.fna&oh=00_AYAvwqKWm8GJgt3XdpRj7afBw5PoAc_fQ6S1dT3HJhxxwA&oe=666B73EA'
            />
            <div className='message-name-container'>Dan Lester Sanz</div>
          </div>
          <div className='message-container'>
            <Avatar
              size='sm'
              isBordered
              color='success'
              src='https://scontent.filo1-1.fna.fbcdn.net/v/t39.30808-6/447232753_822138273124293_1427859901252616171_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGy1iW-53mgIpBdjwlBFWgI9aLNvUZSo4r1os29RlKjisel-M7o6K4ye6XTyoU1WCiXq_wQrZMtBRF16GdIHaqs&_nc_ohc=JwmXfGhaXjAQ7kNvgEAG4dK&_nc_ht=scontent.filo1-1.fna&oh=00_AYAvwqKWm8GJgt3XdpRj7afBw5PoAc_fQ6S1dT3HJhxxwA&oe=666B73EA'
            />
            <div className='message-name-container'>Dan Lester Sanz</div>
          </div>
          <div className='message-container'>
            <Avatar
              size='sm'
              isBordered
              color='success'
              src='https://scontent.filo1-1.fna.fbcdn.net/v/t39.30808-6/447232753_822138273124293_1427859901252616171_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGy1iW-53mgIpBdjwlBFWgI9aLNvUZSo4r1os29RlKjisel-M7o6K4ye6XTyoU1WCiXq_wQrZMtBRF16GdIHaqs&_nc_ohc=JwmXfGhaXjAQ7kNvgEAG4dK&_nc_ht=scontent.filo1-1.fna&oh=00_AYAvwqKWm8GJgt3XdpRj7afBw5PoAc_fQ6S1dT3HJhxxwA&oe=666B73EA'
            />
            <div className='message-name-container'>Dan Lester Sanz</div>
          </div>
          <div className='message-container'>
            <Avatar
              size='sm'
              isBordered
              color='success'
              src='https://scontent.filo1-1.fna.fbcdn.net/v/t39.30808-6/447232753_822138273124293_1427859901252616171_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGy1iW-53mgIpBdjwlBFWgI9aLNvUZSo4r1os29RlKjisel-M7o6K4ye6XTyoU1WCiXq_wQrZMtBRF16GdIHaqs&_nc_ohc=JwmXfGhaXjAQ7kNvgEAG4dK&_nc_ht=scontent.filo1-1.fna&oh=00_AYAvwqKWm8GJgt3XdpRj7afBw5PoAc_fQ6S1dT3HJhxxwA&oe=666B73EA'
            />
            <div className='message-name-container'>Dan Lester Sanz</div>
          </div>
          <div className='message-container'>
            <Avatar
              size='sm'
              isBordered
              color='success'
              src='https://scontent.filo1-1.fna.fbcdn.net/v/t39.30808-6/447232753_822138273124293_1427859901252616171_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGy1iW-53mgIpBdjwlBFWgI9aLNvUZSo4r1os29RlKjisel-M7o6K4ye6XTyoU1WCiXq_wQrZMtBRF16GdIHaqs&_nc_ohc=JwmXfGhaXjAQ7kNvgEAG4dK&_nc_ht=scontent.filo1-1.fna&oh=00_AYAvwqKWm8GJgt3XdpRj7afBw5PoAc_fQ6S1dT3HJhxxwA&oe=666B73EA'
            />
            <div className='message-name-container'>Dan Lester Sanz</div>
          </div>
          <div className='message-container'>
            <Avatar
              size='sm'
              isBordered
              color='success'
              src='https://scontent.filo1-1.fna.fbcdn.net/v/t39.30808-6/447232753_822138273124293_1427859901252616171_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGy1iW-53mgIpBdjwlBFWgI9aLNvUZSo4r1os29RlKjisel-M7o6K4ye6XTyoU1WCiXq_wQrZMtBRF16GdIHaqs&_nc_ohc=JwmXfGhaXjAQ7kNvgEAG4dK&_nc_ht=scontent.filo1-1.fna&oh=00_AYAvwqKWm8GJgt3XdpRj7afBw5PoAc_fQ6S1dT3HJhxxwA&oe=666B73EA'
            />
            <div className='message-name-container'>Dan Lester Sanz</div>
          </div>
          <div className='message-container'>
            <Avatar
              size='sm'
              isBordered
              color='success'
              src='https://scontent.filo1-1.fna.fbcdn.net/v/t39.30808-6/447232753_822138273124293_1427859901252616171_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGy1iW-53mgIpBdjwlBFWgI9aLNvUZSo4r1os29RlKjisel-M7o6K4ye6XTyoU1WCiXq_wQrZMtBRF16GdIHaqs&_nc_ohc=JwmXfGhaXjAQ7kNvgEAG4dK&_nc_ht=scontent.filo1-1.fna&oh=00_AYAvwqKWm8GJgt3XdpRj7afBw5PoAc_fQ6S1dT3HJhxxwA&oe=666B73EA'
            />
            <div className='message-name-container'>Dan Lester Sanz</div>
          </div>
          <div className='message-container'>
            <Avatar
              size='sm'
              isBordered
              color='success'
              src='https://scontent.filo1-1.fna.fbcdn.net/v/t39.30808-6/447232753_822138273124293_1427859901252616171_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGy1iW-53mgIpBdjwlBFWgI9aLNvUZSo4r1os29RlKjisel-M7o6K4ye6XTyoU1WCiXq_wQrZMtBRF16GdIHaqs&_nc_ohc=JwmXfGhaXjAQ7kNvgEAG4dK&_nc_ht=scontent.filo1-1.fna&oh=00_AYAvwqKWm8GJgt3XdpRj7afBw5PoAc_fQ6S1dT3HJhxxwA&oe=666B73EA'
            />
            <div className='message-name-container'>Dan Lester Sanz</div>
          </div>
          <div className='message-container'>
            <Avatar
              size='sm'
              isBordered
              color='success'
              src='https://scontent.filo1-1.fna.fbcdn.net/v/t39.30808-6/447232753_822138273124293_1427859901252616171_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGy1iW-53mgIpBdjwlBFWgI9aLNvUZSo4r1os29RlKjisel-M7o6K4ye6XTyoU1WCiXq_wQrZMtBRF16GdIHaqs&_nc_ohc=JwmXfGhaXjAQ7kNvgEAG4dK&_nc_ht=scontent.filo1-1.fna&oh=00_AYAvwqKWm8GJgt3XdpRj7afBw5PoAc_fQ6S1dT3HJhxxwA&oe=666B73EA'
            />
            <div className='message-name-container'>Dan Lester Sanz</div>
          </div>
          <div className='message-container'>
            <Avatar
              size='sm'
              isBordered
              color='success'
              src='https://scontent.filo1-1.fna.fbcdn.net/v/t39.30808-6/447232753_822138273124293_1427859901252616171_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGy1iW-53mgIpBdjwlBFWgI9aLNvUZSo4r1os29RlKjisel-M7o6K4ye6XTyoU1WCiXq_wQrZMtBRF16GdIHaqs&_nc_ohc=JwmXfGhaXjAQ7kNvgEAG4dK&_nc_ht=scontent.filo1-1.fna&oh=00_AYAvwqKWm8GJgt3XdpRj7afBw5PoAc_fQ6S1dT3HJhxxwA&oe=666B73EA'
            />
            <div className='message-name-container'>Dan Lester Sanz</div>
          </div>
          <div className='message-container'>
            <Avatar
              size='sm'
              isBordered
              color='success'
              src='https://scontent.filo1-1.fna.fbcdn.net/v/t39.30808-6/447232753_822138273124293_1427859901252616171_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGy1iW-53mgIpBdjwlBFWgI9aLNvUZSo4r1os29RlKjisel-M7o6K4ye6XTyoU1WCiXq_wQrZMtBRF16GdIHaqs&_nc_ohc=JwmXfGhaXjAQ7kNvgEAG4dK&_nc_ht=scontent.filo1-1.fna&oh=00_AYAvwqKWm8GJgt3XdpRj7afBw5PoAc_fQ6S1dT3HJhxxwA&oe=666B73EA'
            />
            <div className='message-name-container'>Dan Lester Sanz</div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}
