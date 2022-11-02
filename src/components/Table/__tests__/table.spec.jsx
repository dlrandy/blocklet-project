import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/react';

import StickyHeadTable from '../table';

describe('Table test', () => {
  test('Should render table collectly', () => {
    const { container } = render(<StickyHeadTable />);
    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 css-1fw5qro-MuiPaper-root"
        >
          <div
            class="MuiTableContainer-root css-41abqd-MuiTableContainer-root"
          >
            <table
              aria-label="sticky table"
              class="MuiTable-root MuiTable-stickyHeader css-xn82ks-MuiTable-root"
            >
              <thead
                class="MuiTableHead-root css-15wwp11-MuiTableHead-root"
              >
                <tr
                  class="MuiTableRow-root MuiTableRow-head css-1q1u3t4-MuiTableRow-root"
                />
              </thead>
              <tbody
                class="MuiTableBody-root css-apqrd9-MuiTableBody-root"
              />
            </table>
          </div>
          <div
            class="MuiTablePagination-root css-jtlhu6-MuiTablePagination-root"
          >
            <div
              class="MuiToolbar-root MuiToolbar-gutters MuiToolbar-regular MuiTablePagination-toolbar css-78c6dr-MuiToolbar-root-MuiTablePagination-toolbar"
            >
              <div
                class="MuiTablePagination-spacer css-1psng7p-MuiTablePagination-spacer"
              />
              <p
                class="MuiTablePagination-displayedRows css-levciy-MuiTablePagination-displayedRows"
              >
                0–0 of 0
              </p>
              <div
                class="MuiTablePagination-actions"
              >
                <button
                  aria-label="Go to previous page"
                  class="MuiButtonBase-root Mui-disabled MuiIconButton-root Mui-disabled MuiIconButton-colorInherit MuiIconButton-sizeMedium css-zylse7-MuiButtonBase-root-MuiIconButton-root"
                  disabled=""
                  tabindex="-1"
                  title="Go to previous page"
                  type="button"
                >
                  <svg
                    aria-hidden="true"
                    class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root"
                    data-testid="KeyboardArrowLeftIcon"
                    focusable="false"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"
                    />
                  </svg>
                </button>
                <button
                  aria-label="Go to next page"
                  class="MuiButtonBase-root Mui-disabled MuiIconButton-root Mui-disabled MuiIconButton-colorInherit MuiIconButton-sizeMedium css-zylse7-MuiButtonBase-root-MuiIconButton-root"
                  disabled=""
                  tabindex="-1"
                  title="Go to next page"
                  type="button"
                >
                  <svg
                    aria-hidden="true"
                    class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root"
                    data-testid="KeyboardArrowRightIcon"
                    focusable="false"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `);
  });
});
