"use client";

import { Badge } from "@/components/Badge";
import { useStore } from "@/store/useStore";

const BTN =
  "inline-flex cursor-pointer items-center gap-2 rounded-lg px-[18px] py-[9px] font-sans text-sm font-medium leading-none transition-all";
const BTN_SM = "px-3! py-1.5! text-xs";
const BTN_PRIMARY =
  "bg-primary text-white hover:-translate-y-px hover:bg-primary-hover hover:shadow-[0_4px_12px_rgba(79,70,229,0.3)]";
const BTN_SECONDARY = "bg-gray-200 text-gray-700 hover:bg-gray-300";

export default function UsersPage() {
  const toast = useStore((s) => s.toast);
  return (
    <>
      <div className="mb-7 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-[26px] font-bold tracking-[-0.5px] text-gray-900 md:text-xl">
            Users
          </h1>
          <p className="mt-0.5 text-sm text-gray-500">
            Manage user access and roles
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <button
            className={`${BTN} ${BTN_PRIMARY}`}
            onClick={() => toast("User management coming soon", "info")}
          >
            <i className="fas fa-user-plus"></i> Add User
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] transition-all hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.08),0_4px_6px_-2px_rgba(0,0,0,0.03)]">
        <div className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 border-b border-gray-200 whitespace-nowrap">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 border-b border-gray-200 whitespace-nowrap">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 border-b border-gray-200 whitespace-nowrap">
                    Role
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 border-b border-gray-200 whitespace-nowrap">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 border-b border-gray-200 whitespace-nowrap">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 border-b border-gray-100 text-gray-700">
                    <strong>Admin User</strong>
                  </td>
                  <td className="px-4 py-3 border-b border-gray-100 text-gray-700">
                    admin@marriagelawn.com
                  </td>
                  <td className="px-4 py-3 border-b border-gray-100 text-gray-700">
                    <Badge tone="primary">Owner</Badge>
                  </td>
                  <td className="px-4 py-3 border-b border-gray-100 text-gray-700">
                    <Badge tone="success">Active</Badge>
                  </td>
                  <td className="px-4 py-3 border-b border-gray-100 text-gray-700">
                    <div className="flex gap-1.5">
                      <button className={`${BTN} ${BTN_SM} ${BTN_SECONDARY}`}>
                        <i className="fas fa-edit"></i>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 border-b border-gray-100 text-gray-700">
                    <strong>Manager</strong>
                  </td>
                  <td className="px-4 py-3 border-b border-gray-100 text-gray-700">
                    manager@marriagelawn.com
                  </td>
                  <td className="px-4 py-3 border-b border-gray-100 text-gray-700">
                    <Badge tone="info">Manager</Badge>
                  </td>
                  <td className="px-4 py-3 border-b border-gray-100 text-gray-700">
                    <Badge tone="success">Active</Badge>
                  </td>
                  <td className="px-4 py-3 border-b border-gray-100 text-gray-700">
                    <div className="flex gap-1.5">
                      <button className={`${BTN} ${BTN_SM} ${BTN_SECONDARY}`}>
                        <i className="fas fa-edit"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] transition-all hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.08),0_4px_6px_-2px_rgba(0,0,0,0.03)] mt-5">
        <div className="flex items-center justify-between border-b border-gray-100 px-[22px] py-[18px]">
          <h3 className="text-[15px] font-semibold text-gray-800">
            Role Permissions
          </h3>
        </div>
        <div className="p-[22px]">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
            <div className="rounded-lg border border-gray-200 p-3">
              <h4 className="text-primary">Owner</h4>
              <p className="text-xs text-gray-500">Full access to everything</p>
            </div>
            <div className="rounded-lg border border-gray-200 p-3">
              <h4 className="text-info">Manager</h4>
              <p className="text-xs text-gray-500">
                Bookings, Customers, Food, Payments, Reports
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 p-3">
              <h4 className="text-warning">Receptionist</h4>
              <p className="text-xs text-gray-500">
                Bookings, Customers, Calendar
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 p-3">
              <h4 className="text-success">Cashier</h4>
              <p className="text-xs text-gray-500">Payments, Receipts</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
