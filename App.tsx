import * as React from 'react';
import './style.css';
import { useState, useRef, useEffect } from 'react';

export default function MyApp() {
  const [scrollPositions, setScrollPositions] = useState({});
  const element = ['lorem','ipsum']
  console.log(scrollPositions)
  const handleScroll = (id, scrollTop) => {

    setScrollPositions((prevState) => {
      if (prevState[id] !== scrollTop) {
        return {
          ...prevState,
          [id]: scrollTop,
        };
      }
      return prevState;
    });
  };

  return (
    <div>
      <Element
        id="element1"
        onScroll={handleScroll}
        scrollPosition={scrollPositions['element1']}
      />
      <Element
        id="element2"
        onScroll={handleScroll}
        scrollPosition={scrollPositions['element2']}
      />
    </div>
  );

  function Element({ id, onScroll, scrollPosition }) {
    const ref = useRef(null);

    useEffect(() => {
      if (ref.current /*&& scrollPosition !== ref.current.scrollTop*/) {
        ref.current.scrollTop = scrollPosition;
      }
    }, [scrollPosition]);

    const handleElementScroll = () => {
      if (ref.current) {
        onScroll(id, ref.current.scrollTop);
      }
    };

    return (
      <div>
        <div>{id + ' : ' + scrollPosition}</div>
        <div ref={ref} className="ovf" onScroll={handleElementScroll}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
          porttitor vulputate consequat. Suspendisse elementum massa at lectus
          venenatis, vel lacinia risus consectetur. Morbi eget vestibulum
          ligula. Orci varius natoque penatibus et magnis dis parturient montes,
          nascetur ridiculus mus. Cras et placerat leo, sit amet rhoncus tellus.
          Donec eget felis sed velit mollis mattis in id sem.
        </div>
      </div>
    );
  }
}
