import { useState, useEffect } from "react"
import { useSelector } from "react-redux"

import ItemsByCategory from "../components/ItemsByCategory"

import '../assets/home.scss'
import '../assets/products.scss'


function Home() {

    const items = useSelector(state => state.store.items);  // to display store items (you bet)
    const [categories, setCategories] = useState([]);       // to filter store items by category (live because store items take time to retrieve)


    /* on store items change (which is actually only trigerred when they are first loaded since they never change) */
    useEffect(() => {
        /* filter store items by category */
        let categories_ = [];
        items.forEach((item) => {
            if (!categories_.find(c => c === item.category))
                categories_.push(item.category);
        });
        setCategories(categories_);

    }, [items]);


    return (
        <>
            <div id="home">

                <div className="disclaimer">
                    <span>Let me sleep ~~</span>
                </div>

                {
                    !items.length ?

                        /* loading (yeeah, it might have failed but you'll never know coz we're too lazy ~~) */
                        <div className="loader-wrapper">
                            <span className="loader"></span>
                        </div>

                        :

                        /* loaded */
                        <>
                            <div id="content">
                                {
                                    /* display store items by category (not ideal, but much better than an half-assed raw display) */
                                    categories.map((category, idx) =>
                                        <div key={idx}> {/* (serves no purpose at all, I just don't know how to wrap more than one element in a .map, shame on me!) */}
                                            <h2 className="category-header">{category}</h2>
                                            <ItemsByCategory category={category} />
                                        </div>
                                    )
                                }
                            </div>
                        </>
                }

            </div>
        </>
    )

}

export default Home;