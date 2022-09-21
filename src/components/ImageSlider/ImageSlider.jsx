import { useState, useEffect } from "react";
import { calculateAspectRatioFit } from "../../utils/Utils";
import Canvas from "../Canvas/Canvas";

const ImageSlider = (props) => {
  const { imagesList, width, height, isPaginated } = props;
  const [imagesObj, setImagesObj] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loadNext, setLoadNext] = useState(false);
  const [mouseState, setMouseState] = useState("");
  const [pivotX, setPivotX] = useState(0);
  const [dragX, setDragX] = useState();
  const [canvasWidth, setCanvasWidth] = useState(0);
  //const [speed, setSpeed] = useState(0);
  const [frameCount, setFrameCount] = useState();
  const [animation, setAnimation] = useState(0);
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    loadImage(0);
  }, []);

  useEffect(() => {
    const nextLoadImageIndex = currentImageIndex + 1;
    if (
      loadNext &&
      imagesObj.length > 0 &&
      nextLoadImageIndex >= imagesObj.length &&
      nextLoadImageIndex < imagesList.length
    ) {
      loadImage(nextLoadImageIndex);
    }
  }, [loadNext, imagesObj.length]);

  const loadImage = (index) => {
    setLoadNext(false);
    console.log(">>>LOAD " + index);
    const img = new Image();
    img.src = imagesList[index];
    img.onload = () => {
      setImagesObj((imagesObj) => [...imagesObj, img]);
      if (imagesObj.length <= 0) setLoadNext(true);
    };
  };

  useEffect(() => {
    setLoadNext(true);
  }, [currentImageIndex]);

  const mouseUpHandler = (e) => {
    setMouseState("up");
    clearEvents();
  };

  const clearEvents = () => {
    window.removeEventListener("mousemove", mouseMoveHandler);
    window.removeEventListener("mouseup", mouseUpHandler);
  };

  const resetDrag = () => {
    clearEvents();
    setDragX(null);
    setPivotX(0);
    setAnimation(0);
    setStartAnimation(false);
  };

  const mouseDownHandler = (e) => {
    if (!startAnimation) {
      setMouseState("down");
      setDragX(e.pageX);
    }
  };

  useEffect(() => {
    if (dragX) {
      window.addEventListener("mousemove", mouseMoveHandler);
      window.addEventListener("mouseup", mouseUpHandler);
    }
  }, [dragX]);

  const mouseMoveHandler = (e) => {
    setMouseState("move");
    let targetX = pivotX + (e.pageX - dragX);
    moveTo(targetX);
  };

  const moveTo = (targetX) => {
    if (currentImageIndex == 0 && targetX > 0) {
      //limit LEFT
      targetX = 0;
    } else if (currentImageIndex >= imagesObj.length - 1 && targetX < 0) {
      //limit RIGHT
      targetX = 0;
    } else if (targetX < -canvasWidth) {
      targetX = -canvasWidth;
    }

    if (!setCurrentImageByPosition(targetX)) {
      setPivotX((pivotX) => targetX);
      if (isPaginated) {
        setAnimation(pivotX - targetX);
      }
    }
  };

  useEffect(() => {
    if (isPaginated && startAnimation && animation != 0) {
      const speed = 4;
      if (animation > 0) {
        moveTo(pivotX - speed);
      }
      if (animation < 0) {
        moveTo(pivotX + speed);
      }
    }
  }, [frameCount]);

  useEffect(() => {
    if (mouseState === "up") {
      if (isPaginated && pivotX != 0) {
        setStartAnimation(true);
      }
    }
  }, [mouseState]);

  const setCurrentImageByPosition = (targetX) => {
    if (targetX != 0 && canvasWidth + targetX <= 0) {
      setCurrentImageIndex(currentImageIndex + 1);
      resetDrag();
      return true;
    }

    if (targetX > canvasWidth) {
      setCurrentImageIndex(currentImageIndex - 1);
      resetDrag();
      return true;
    }

    return false;
  };

  /*
   * ----------------- DRAW -------------------
   */

  const draw = (ctx, frameCount) => {
    setCanvasWidth(ctx.canvas.width);
    setFrameCount(frameCount);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    const currentImage = imagesObj[currentImageIndex];
    if (currentImage) {
      drawImage(ctx, currentImage, pivotX);
      const nextImage = imagesObj[currentImageIndex + 1];
      if (nextImage) {
        drawImage(ctx, nextImage, pivotX + ctx.canvas.width);
      }

      const prevImage = imagesObj[currentImageIndex - 1];
      if (prevImage) {
        drawImage(ctx, prevImage, pivotX - ctx.canvas.width);
      }
    }
  };

  const drawImageFrame = (ctx, posX) => {
    ctx.fillStyle = "gray";
    ctx.beginPath();
    ctx.rect(posX, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fill();
  };

  const drawImage = (ctx, imageObj, posX) => {
    drawImageFrame(ctx, posX);

    const imageSize = calculateAspectRatioFit(
      imageObj.width,
      imageObj.height,
      ctx.canvas.width,
      ctx.canvas.height
    );

    ctx.drawImage(
      imageObj,
      imageSize.x + posX,
      imageSize.y,
      imageSize.width,
      imageSize.height
    );
  };

  return (
    <Canvas
      width={width}
      height={height}
      draw={draw}
      onMouseDown={mouseDownHandler}
    />
  );
};

export default ImageSlider;
