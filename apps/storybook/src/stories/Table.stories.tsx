import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Icon,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@workspace/ui';

/*
 * Deviations from https://ui.shadcn.com/docs/components/base/table:
 * - Right-aligned cells use an inline `textAlign` style because stories do not use Tailwind classes.
 * - The Data Table example (TanStack Table) is omitted: it is a guide, not a Table example.
 * - The RTL story uses a `dir="rtl"` wrapper instead of the shadcn translation helper.
 */

const meta = {
  title: 'Data Display/Table',
  component: Table,
  tags: ['autodocs'],
} satisfies Meta<typeof Table>;

export default meta;

type Story = StoryObj<typeof meta>;

const RTL_ROWS = 3;
const RIGHT = { textAlign: 'end' } as const;

const INVOICES = [
  { invoice: 'INV001', paymentStatus: 'Paid', totalAmount: '$250.00', paymentMethod: 'Credit Card' },
  { invoice: 'INV002', paymentStatus: 'Pending', totalAmount: '$150.00', paymentMethod: 'PayPal' },
  { invoice: 'INV003', paymentStatus: 'Unpaid', totalAmount: '$350.00', paymentMethod: 'Bank Transfer' },
  { invoice: 'INV004', paymentStatus: 'Paid', totalAmount: '$450.00', paymentMethod: 'Credit Card' },
  { invoice: 'INV005', paymentStatus: 'Paid', totalAmount: '$550.00', paymentMethod: 'PayPal' },
  { invoice: 'INV006', paymentStatus: 'Pending', totalAmount: '$200.00', paymentMethod: 'Bank Transfer' },
  { invoice: 'INV007', paymentStatus: 'Unpaid', totalAmount: '$300.00', paymentMethod: 'Credit Card' },
] as const;

function InvoiceTable({ footer }: { footer: boolean }) {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead style={RIGHT}>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {INVOICES.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell>{invoice.invoice}</TableCell>
            <TableCell>{invoice.paymentStatus}</TableCell>
            <TableCell>{invoice.paymentMethod}</TableCell>
            <TableCell style={RIGHT}>{invoice.totalAmount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      {footer ? (
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell style={RIGHT}>$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      ) : null}
    </Table>
  );
}

export const Demo: Story = {
  render: () => <InvoiceTable footer />,
};

export const Footer: Story = {
  render: () => <InvoiceTable footer />,
};

const PRODUCTS = [
  { name: 'Wireless Mouse', price: '$29.99' },
  { name: 'Mechanical Keyboard', price: '$129.99' },
  { name: 'USB-C Hub', price: '$49.99' },
] as const;

export const Actions: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>Price</TableHead>
          <TableHead style={RIGHT}>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {PRODUCTS.map((product) => (
          <TableRow key={product.name}>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.price}</TableCell>
            <TableCell style={RIGHT}>
              <DropdownMenu>
                <DropdownMenuTrigger variant="muted" shape="icon" size="sm">
                  <Icon name="more-horizontal" />
                  <span className="sr-only">Open menu</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Duplicate</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const Rtl: Story = {
  name: 'RTL',
  render: () => (
    <div dir="rtl">
      <Table>
        <TableCaption>قائمة بفواتيرك الأخيرة.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>الفاتورة</TableHead>
            <TableHead>الحالة</TableHead>
            <TableHead>الطريقة</TableHead>
            <TableHead style={{ textAlign: 'start' }}>المبلغ</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {INVOICES.slice(0, RTL_ROWS).map((invoice) => (
            <TableRow key={invoice.invoice}>
              <TableCell>{invoice.invoice}</TableCell>
              <TableCell>{invoice.paymentStatus}</TableCell>
              <TableCell>{invoice.paymentMethod}</TableCell>
              <TableCell>{invoice.totalAmount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ),
};
