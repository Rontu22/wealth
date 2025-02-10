import { getUserAccounts } from "@/actions/dashboard";
import { defaultCategories } from "@/data/categories";
import React from "react";
import AddTransactionForm from "../_components/transaction-form";
import { getTransaction } from "@/actions/transaction";

const AddTransactionPage = async ({ searchParams }) => {
  try {
    const accounts = await getUserAccounts();
    let initialData = null;

    if (searchParams?.edit) {
      initialData = await getTransaction(searchParams.edit);
    }

    return (
      <div className="max-w-3xl max-auto px-5">
        <h1 className="text-5xl gradient-title mb-8">
          {searchParams?.edit ? `Edit Transaction` : `Add Transaction`}
        </h1>
        <AddTransactionForm
          accounts={accounts}
          categories={defaultCategories}
          editMode={!!searchParams?.edit}
          initialData={initialData}
        />
      </div>
    );
  } catch (error) {
    console.error("Error loading transaction page:", error);
    return <div>Error loading transaction form. Please try again later.</div>;
  }
};

export default AddTransactionPage;
