import React from "react";
import { H1 } from "@blueprintjs/core";
import "@blueprintjs/core/lib/css/blueprint.css";
import UserList from '../../containers/userList'


export const DataTable = (state: any) => {

    return (
        <>
            <H1>Вывод списка в табличном виде и фильтрация строк по вводимой подстроке</H1>
            <UserList />
        </>
    );


}