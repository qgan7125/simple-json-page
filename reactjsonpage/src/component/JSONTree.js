import React, { useEffect,useState } from 'react';
import TreeView from "react-treeview";
import sampleData from "../records/IGSN-ODP02DGLR.json";

function JSONTree (props) {
    const [trees,setTrees] = useState([]);
    const [data,setData] = useState({});

    useEffect(()=>{
        console.log(props);
        setData(props);
        setTrees(scanJSON(data));
    },[])
    
    const scanJSON = (json)=>{
        let trees = []
        for (var key in json) {
            let value = json[key];
            if (value != null) {
                if (typeof value === "object") {
                    if (Array.isArray(value)) { //array as value

                        let nested = false;
                        for (var i = 0; i < value.length; i++) {
                            if (typeof value[i] === "object") {
                                nested = true; //object array
                                break;
                            }
                        }
                        if (!nested) {
                            trees.push(
                                <TreeView nodeLabel={key} defaultCollapsed={false}>
                                {value}
                                </TreeView>
                            );
                        } else {
                            //object array
                            for (var i = 0; i < value.length; i++) {
                                trees.push(
                                <TreeView nodeLabel={key + i} defaultCollapsed={false}>
                                    {scanJSON(value[i])}
                                </TreeView>
                                );
                            }
                        }
                    } else { //non-array
                        trees.push(
                        <TreeView nodeLabel={key} defaultCollapsed={false}>
                            {scanJSON(value)}
                        </TreeView>
                        );
                    }
                } else { //non object 
                    trees.push(
                        <TreeView nodeLabel={key} defaultCollapsed={false}>
                        {value}
                        </TreeView>
                    );
                }
            }
        }
        return trees;
    }

    return (
        <div>
  
            {trees}

        </div>
    );
}

export default JSONTree;