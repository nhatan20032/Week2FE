import { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import React from "react";

import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'primeicons/primeicons.css';

interface Customer {
  id: number;
  name: string;
  country: string;
  company: string;
  status: string;
}

function generateFakeCustomers(count: number): Customer[] {
  const rand = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Customer ${i + 1}`,
    country: rand(["USA", "UK", "Germany", "France", "Japan"]),
    company: rand(["Acme Corp", "Globex", "Initech", "Hooli", "Umbrella"]),
    status: rand(["Active", "Inactive", "Pending"]),
  }));
}

export default function DataTablePagination() {
  const emptyCustomer: Customer = {
    id: 0,
    name: "",
    country: "",
    company: "",
    status: "",
  };

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomers, setSelectedCustomers] = useState<Customer[] | null>(
    null
  );
  const [customer, setCustomer] = useState<Customer>(emptyCustomer);
  const toast = useRef<Toast>(null);
  const [deleteCustomersDialog, setDeleteCustomersDialog] =
    useState<boolean>(false);
  const [deleteCustomerDialog, setDeleteCustomerDialog] =
    useState<boolean>(false);
  const dt = useRef<DataTable<Customer[]>>(null);

  const deleteCustomer = () => {
    const users = customers.filter((val) => val.id !== customer.id);

    setCustomers(users);
    setDeleteCustomerDialog(false);
    setCustomer(emptyCustomer);
    toast.current?.show({
      severity: "success",
      summary: "Successful",
      detail: "Product Deleted",
      life: 3000,
    });
  };

  const deleteSelectedCustomers = () => {
    const users = customers.filter((val) => !selectedCustomers?.includes(val));

    setCustomers(users);
    setDeleteCustomersDialog(false);
    setSelectedCustomers([]);

    toast.current?.show({
      severity: "success",
      summary: "Successful",
      detail: "Products Deleted",
      life: 3000,
    });
  };

  const confirmDeleteCustomer = (cus: Customer) => {
    setCustomer(cus);
    setDeleteCustomerDialog(true);
  };

  const hideDeleteCustomerDialog = () => {
    setDeleteCustomerDialog(false);
  };

  const hideDeleteCustomersDialog = () => {
    setDeleteCustomersDialog(false);
  };

  const confirmDeleteSelected = () => {
    setDeleteCustomersDialog(true);
  };

  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button
          label="Delete"
          icon="pi pi-trash"
          severity="danger"
          onClick={confirmDeleteSelected}
          disabled={!selectedCustomers || !selectedCustomers.length}
        />
      </div>
    );
  };

  const deleteCustomersDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteCustomersDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteSelectedCustomers}
      />
    </React.Fragment>
  );

  const deleteCustomerDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteCustomerDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteCustomer}
      />
    </React.Fragment>
  );

  const actionBodyTemplate = (rowData: Customer) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => confirmDeleteCustomer(rowData)}
        />
      </React.Fragment>
    );
  };

  useEffect(() => {
    setCustomers(generateFakeCustomers(20));
  }, []);

  return (
    <div>
      <Toast ref={toast} />
      <div className="card p-5 rounded-2xl border-0 border-solid shadow-2xl m-5">
        <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>
        <DataTable
          ref={dt}
          selectionMode={"checkbox"}
          selection={selectedCustomers!}
          stripedRows
          onSelectionChange={(e) => {
            console.log(e);            
            setSelectedCustomers(e.value);
          }}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
          dataKey={"id"}
          value={customers}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 20]}
          tableStyle={{ minWidth: "50rem" }}
        >
          <Column
            selectionMode="multiple"
            headerStyle={{ width: "3rem" }}
          ></Column>
          <Column field="id" header="Id" style={{ width: "25%" }}></Column>
          <Column field="name" header="Name" style={{ width: "25%" }}></Column>
          <Column
            field="country"
            header="Country"
            style={{ width: "25%" }}
          ></Column>
          <Column
            field="company"
            header="Company"
            style={{ width: "25%" }}
          ></Column>
          <Column
            field="status"
            header="Status"
            style={{ width: "25%" }}
          ></Column>
          <Column
            body={actionBodyTemplate}
            exportable={false}
            style={{ minWidth: "12rem" }}
          ></Column>
        </DataTable>
      </div>

      <Dialog
        visible={deleteCustomerDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirm"
        modal
        footer={deleteCustomerDialogFooter}
        onHide={hideDeleteCustomerDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {customer && (
            <span>
              Are you sure you want to delete <b>{customer.name}</b>?
            </span>
          )}
        </div>
      </Dialog>

      <Dialog
        visible={deleteCustomersDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirm"
        modal
        footer={deleteCustomersDialogFooter}
        onHide={hideDeleteCustomersDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {customer && (
            <span>Are you sure you want to delete the selected products?</span>
          )}
        </div>
      </Dialog>
    </div>
  );
}
