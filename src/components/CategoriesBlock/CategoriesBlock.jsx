import classes from './CategoriesBlock.module.scss';

import { useState } from 'react';
import { Collapse } from 'antd';
import { useTranslation } from 'react-i18next';

import Checkbox from "../../components/Checkbox/Checkbox";
import RatingStars from "../../components/RatingStars/RatingStars";
import Button from '../../components/Button/Button';

const { Panel } = Collapse;


const handleCheckbox = (e, name) => {
    alert(name);
}

export const CategoriesBlock = ({ data }) => {
    const { t } = useTranslation();

    const [checkboxesState, setCheckboxesState] = useState();
    return (
        <div className={`${classes.productListSortWrapper} shadow`}>
            {data && data.map((block, key) => (
                <div className={classes.productListSort} key={key}>
                    <h3>{block.header}</h3>
                    <Collapse
                        defaultActiveKey={['0']}
                        expandIconPosition={'right'}
                        ghost
                    >
                        {block.subcategories && block.subcategories.map((sc, key) => (
                            <Panel header={sc.header} key={key}>
                                <div>
                                    {sc.items && sc.items.map((item, key) => (
                                        <div key={key}>
                                            <h4>{item.header}</h4>
                                            {item.checkboxes && item.checkboxes.map((checkboxName, key) => (
                                                <Checkbox
                                                    name={checkboxName}
                                                    label={checkboxName}
                                                    parentClassName='d-flex flex-items-center'
                                                    onChange={(e) => handleCheckbox(e, checkboxName)}
                                                    checked={false}
                                                    key={key}
                                                />
                                            ))}
                                        </div>
                                    ))
                                    }
                                    {sc.checkboxes && sc.checkboxes.map((checkboxName, key) => (
                                        <Checkbox
                                            name={checkboxName}
                                            label={checkboxName}
                                            parentClassName='d-flex flex-items-center'
                                            onChange={(e) => handleCheckbox(e, checkboxName)}
                                            checked={false}
                                            key={key}
                                        />
                                    ))}
                                </div>
                            </Panel>
                        ))}

                    </Collapse>
                </div>

            ))}
        </div >

    )
}
