import ControlPointIcon from '@material-ui/icons/ControlPoint';
import RemoveIcon from '@material-ui/icons/Remove';
import IconButton from '@material-ui/core/IconButton';
import { useState } from 'react';
import Link from 'next/link'

const PortfolioCard = ({ data }) => {
    //Add a recharts graph component to .chartInfo to replace lorem ipsum
    //Need to animate the transition between content displaying;
    const [open, setDisplay] = useState(false)

    const toggleAccordion = () => {
        if (open) {
            setDisplay(false)
        }
        else {
            setDisplay(true)
        }

    }

    return (
        <div>
            <div className="portfolioCard">
                <Link href={`/portfolios/${data.portfolio_name}`}>
                    <h3>{data.portfolio_name}</h3>
                </Link>
                {/*
                <p className="percentage">$3000(+8.28%)</p>
                */}
                {/* Following code block is meant to show a quick preview of the data of the users current portfolio value*/}
                {/* <div className="plus">
                    <p className="value">{data.latestValue.toFixed(2)}</p>
                    <div className={`toggleButton ${open ? 'active' : ''}`} onClick={toggleAccordion} >
                        <RemoveIcon className="secondIcon" fontSize="small" />
                        <ControlPointIcon className="targetIcon" fontSize="small" />
                    </div>
                    {open
                        ? <RemoveIcon onClick={toggleAccordion} className="secondIcon" fontSize="small" />
                        : <ControlPointIcon onClick={toggleAccordion} className="targetIcon" fontSize="small" />

                    }
                    
                </div> */}
            </div>

            <div style={{ display: open ? 'block' : 'none' }} className="chartInfo">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla diam lacus, sagittis ut augue sed, venenatis tempor massa. Donec nec neque ut nulla accumsan imperdiet id et ex. Vivamus sed scelerisque ex. Suspendisse bibendum mauris nec accumsan egestas. Quisque hendrerit blandit erat in ultricies. Ut finibus quis dolor commodo posuere. Donec lacus lectus, interdum dapibus eros ut, blandit pharetra risus. Donec ut suscipit elit, sit amet sodales risus. Pellentesque posuere nunc magna, lobortis pharetra metus rutrum non. Cras commodo efficitur neque vel tristique. Quisque varius efficitur sapien. Vivamus suscipit mattis est, vitae sagittis massa consectetur nec.

                    Suspendisse gravida sapien at tempor tincidunt. Duis feugiat, tellus in tempus eleifend, ligula eros facilisis erat, in imperdiet nulla neque vitae felis. Etiam elementum tincidunt ligula id ultricies. Proin sem sapien, cursus et luctus eu, facilisis sed neque. Proin sed fringilla turpis. Donec at facilisis mi, non molestie massa. Cras eros est, elementum vitae quam a, tristique porttitor leo. Vivamus in tellus ut nunc iaculis facilisis sit amet in metus.
                </p>
            </div>
        </div>
    )
}

export default PortfolioCard;