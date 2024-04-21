import { useEffect, useState } from "react";
import { Image } from "antd";

const View = () => {
  const [imgSrc, setImgSrc] = useState("");

  useEffect(() => {
    const fetchImage = () => {
      const url = "http://localhost:8080/statistic/picture";

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          const imagePath = window.location.origin + "/images/" + data.title + ".jpg";
          setImgSrc(imagePath);
        });
    };

    // 立即获取一次图片
    fetchImage();
    // 然后每隔30秒获取一次图片
    const intervalId = setInterval(fetchImage, 30 * 1000);

    // 清理函数，在组件卸载时取消定时器
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return imgSrc ? <Image src={imgSrc} /> : null;
};

export default View;