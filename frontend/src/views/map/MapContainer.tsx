import React, { useEffect, useRef, useState } from 'react';
import AMapLoader from '@amap/amap-jsapi-loader';
import styles from "./map.module.scss"

const MapComponent: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const [data_source, setDataSource] = useState<number[][]>([]);

  useEffect(() => {
    findplace()
  }, []);

  const findplace = async () => {
    fetch('http://localhost:8080/map/find', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(async response => {
        if (response.ok) {
          const result = await response.json();
          setDataSource(result.data.map((item: any) => [item.place, item.lon, item.lat, item.max_co2, item.avg_co2, item.max_people]));
        }
        else {
  
        }
      })
  }

  const loadMapAndAddMarkers = () => {
    AMapLoader.load({
      key: "278c2ea51da6533cb88922bbccc9655f",
      version: "2.0",
      plugins: ['AMap.Marker'],
    })
      .then((AMap) => {
        const map = new AMap.Map(mapContainerRef.current!, {
          viewMode: "3D",
          zoom: 17,
          center: [120.123077, 30.263842],
        });

        data_source.forEach(item => {
          const place = item[0];
          const lon = item[1];
          const lat = item[2];
          const max_co2 = item[3];
          const avg_co2 = item[4];
          const max_people = item[5];
          const marker = new AMap.Marker({
            position: [lon, lat],
            map: map
          });
          marker.on('click', function (e: any) {
            const infoWindow = new AMap.InfoWindow({
              content: `位置名称：${place}<br>最大二氧化碳浓度：${max_co2}<br>平均二氧化碳浓度：${avg_co2}<br>最大人数：${max_people}`,
              offset: new AMap.Pixel(0, -30),
            });
            infoWindow.open(map, e.target.getPosition());
          });
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    loadMapAndAddMarkers();
  }, [data_source]);

  return (
    <div>
      <div ref={mapContainerRef} className={styles.mapContainer}></div>
    </div>
  );
};

export default MapComponent;
