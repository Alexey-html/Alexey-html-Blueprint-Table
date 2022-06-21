import React from 'react';
import { connect } from 'react-redux';
import { Table2, ColumnHeaderCell, Column, Cell } from "@blueprintjs/table";
import { EditableText, FormGroup, InputGroup, H5 } from "@blueprintjs/core";
import "./userList.css"
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/table/lib/css/table.css";

interface dataType {
    username: string;
    action: string;
    action_createad_at: string;
}

export const UserList = (state: any) => {

    const [searchStr, setSearchStr] = React.useState<string>('');
    const [searchStrUsername, setSearchStrUsername] = React.useState<string>('');
    const [searchStrAction, setSearchStrAction] = React.useState<string>('');
    const [searchStrActionCreatead, setSearchStrActionCreatead] = React.useState<string>('');

    const headerFilterBild = (str: string, state: string, setState: Function) => {
        return (
            <EditableText
                placeholder={str}
                onChange={(value: string) => setState(value)}
                value={state}
                className="editable-input"
            />
        )

    }

    const renderCellUsername = (rowIndex: number) => <Cell>{dataFilter[rowIndex]?.username} </Cell>

    const renderCellAction = (rowIndex: number) => <Cell> {dataFilter[rowIndex]?.action}</Cell>

    const renderCellActionCreatead = (rowIndex: number) => <Cell>{dataFilter[rowIndex]?.action_createad_at}</Cell>

    let dataFilter: any = [];
    if (searchStr !== '') {
        dataFilter = state.dataUserList?.filter((item: dataType) => item?.username?.indexOf(searchStr) > -1 ||
            item?.action?.indexOf(searchStr) > -1 ||
            item?.action_createad_at?.indexOf(searchStr) > -1)
    } else {
        dataFilter = state.dataUserList?.filter((item: dataType) => item?.username?.indexOf(searchStrUsername) > -1 &&
            item?.action?.indexOf(searchStrAction) > -1 &&
            item?.action_createad_at?.indexOf(searchStrActionCreatead) > -1)
    }


    const columnHeaderCellRenderer = (rowIndex: number) => {
        let name: string = ""
        name = rowIndex === 0 ? "Username" :
            rowIndex === 1 ? "Action" :
                rowIndex === 2 ? "Action_createad_at" :
                    '';
        let setState: Function;
        setState = rowIndex === 0 ? setSearchStrUsername :
            rowIndex === 1 ? setSearchStrAction :
                rowIndex === 2 ? setSearchStrActionCreatead :
                    setSearchStrUsername;

        let state: string = ""
        state = rowIndex === 0 ? searchStrUsername :
            rowIndex === 1 ? searchStrAction :
                rowIndex === 2 ? searchStrActionCreatead :
                    '';

        return (
            <ColumnHeaderCell name={name} children={headerFilterBild("Поиск", state, setState)} />
        )
    }

    React.useEffect(() => {
        if ((searchStrUsername && searchStr) || (searchStrAction && searchStr) || (searchStrActionCreatead && searchStr)) {
            setSearchStr('')
        }
    }, [searchStrUsername, searchStrAction, searchStrActionCreatead])

    React.useEffect(() => {
        if ((searchStrUsername && searchStr) || (searchStrAction && searchStr) || (searchStrActionCreatead && searchStr)) {
            setSearchStrUsername('')
            setSearchStrAction('')
            setSearchStrActionCreatead('')
        }
    }, [searchStr])




    return (

        <>
            <FormGroup
                label="Поиск по вводимой подстроке для трех столбцов одновременно (Username, Action, Action_createad_at):"
                helperText="Для поиска значения в определенном столбце воспользуйтесь соответствующим полем в заголовке таблицы"
                className="form-group-block"
            >
                <InputGroup
                    onChange={e => setSearchStr(e.currentTarget.value)}
                    value={searchStr}
                    leftIcon="filter"
                />
            </FormGroup>
            <div className="user-list-table">
                <Table2
                    numRows={dataFilter?.length}
                    columnWidths={[300, 300, 300]}
                >
                    <Column
                        name="Username"
                        cellRenderer={renderCellUsername}
                        columnHeaderCellRenderer={columnHeaderCellRenderer}
                    />
                    <Column
                        name="Action"
                        cellRenderer={renderCellAction}
                        columnHeaderCellRenderer={columnHeaderCellRenderer}
                    />
                    <Column
                        name="Action_createad_at"
                        cellRenderer={renderCellActionCreatead}
                        columnHeaderCellRenderer={columnHeaderCellRenderer}
                    />
                </Table2>
            </div>
            {
                dataFilter?.length === 0 ?
                    (
                        <H5 className="message-search">По вашему запросу не найдено ни одного совпадения</H5>
                    ) : null
            }
        </>
    )

}


const mapStateToProps = (state: any) => {
    return {
        dataUserList: state.dataUserList
    }
}

export default connect(mapStateToProps)(UserList)