import RandomProfileGenerator from 'random-profile-generator';
import './App.css';
import { useState } from 'react';

const rows = 100;
const rowHeight = 80;
const containerHeight = 400;
const extraElement = 5;
const baseElementCount = 5;
const data = Array(rows).fill(1).map(() => {
  return {
    name: RandomProfileGenerator.name(),
    guid: RandomProfileGenerator.guid()
  }
});


function MyReactVirtualized() {

  const [calculations, setRenderCalculations] = useState({
    scroll_position_from_top: 0,
    no_elemets_rendered: baseElementCount+extraElement,
    start_index: 0,
    end_index: baseElementCount+extraElement
  })

  const handlScroll = (e) => {
    const element = document.getElementById('scrollable-container');
    const scrollPosition = element.scrollTop
    const numberOfElementsToRender = Math.ceil((scrollPosition / rowHeight) + (containerHeight / rowHeight)) + extraElement;
    const startIndex = numberOfElementsToRender - baseElementCount - extraElement;
    const endIndex = numberOfElementsToRender;
    setRenderCalculations({
      scroll_position_from_top: scrollPosition,
      no_elemets_rendered: numberOfElementsToRender,
      start_index: startIndex,
      end_index: endIndex
    })
  }

  return (
    <>
      <div id='scrollable-container' onScroll={handlScroll} className="contiaer">
        {
          data.filter((_, index) => index <= calculations.end_index)
            .map((profile, index) => {
              return (
                <div className='profile-div' key={profile.guid} >
                  <p>{index + 1}.{profile.name}</p>
                </div>
              )
            })
        }
      </div>
      <div id='data-container' onScroll={handlScroll} className="data-contiaer">
        {
          Object.keys(calculations).map(key => <p>{key} : {calculations[key]}</p>)
        }
      </div>
    </>
  );
}

export default MyReactVirtualized;
