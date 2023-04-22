import * as React from 'react';
import './style.css';
import { useState, useEffect, useRef } from 'react';

export default function App() {
  const [scrolls, setScrolls] = useState([
    { element: 'lorem', scrollTop: 0 },
    { element: 'ipsum', scrollTop: 0 },
  ]);

  function scrollElement(element, event) {
    const newScrolls = scrolls.map((e) => {
      return { ...e };
    });
    newScrolls.map((e) => {
      if (e.element == element) {
        e.scrollTop = Math.round(event.target.scrollTop);
      }
    });
    setScrolls(newScrolls);
  }

  function Element(props) {
    console.log(props.scrollTop);
    let elementRef = useRef();

    useEffect(() => {
      if (elementRef) elementRef.current.scrollTop = props.scrollTop;
    }, [elementRef, props.scrollTop]);

    return (
      <div>
        <div>{props.element + ':' + props.scrollTop}</div>
        <div
          ref={elementRef}
          id={props.element}
          onScroll={() => {
            props.scrollElement(props.element, event);
          }}
          style={{
            height: '200px',
            width: '200px',
            overflow: 'scroll',
            border: '1px solid black',
          }}
        >
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

  return (
    <div>
      {scrolls.map((e) => (
        <Element
          key={e.element}
          element={e.element}
          scrollTop={e.scrollTop}
          scrollElement={scrollElement}
        />
      ))}
    </div>
  );
}
