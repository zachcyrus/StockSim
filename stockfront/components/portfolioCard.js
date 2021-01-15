import ControlPointIcon from '@material-ui/icons/ControlPoint';
import RemoveIcon from '@material-ui/icons/Remove';
import { useState } from 'react';


const PortfolioCard = () => {
    //Add a recharts graph component to .chartInfo to replace lorem ipsum
    const [open, setDisplay] = useState(false)

    const toggleAccordion = () => {
        if (open) {
            setDisplay(false)
            console.log(open)
        }
        else {
            setDisplay(true)
            console.log(open)
        }

    }

    return (
        <div>
            <div className="portfolioCard">
                <h3>Tech</h3>
                <p className="percentage">$3000(+8.28%)</p>
                <div className="plus">
                    <p className="value">$25,324,000</p>
                    {open
                        ? <RemoveIcon onClick={toggleAccordion} fontSize="small" />
                        : <ControlPointIcon onClick={toggleAccordion} fontSize="small" />
                    }
                </div>
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