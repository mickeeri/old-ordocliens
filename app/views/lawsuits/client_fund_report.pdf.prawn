prawn_document(page_size: "A4", page_layout: :portrait) do |pdf|
  require "open-uri"

  # Header
  pdf.font "app/assets/fonts/pala.ttf"
  pdf.move_down 30
  pdf.font_size 22
  pdf.text "Klientmedel för ärende #{@lawsuit.slug}"

  # Table
  pdf.move_down 20
  pdf.font "app/assets/fonts/pala.ttf"
  pdf.font_size 10.5
  table_data = [%w(Datum Notering Saldo)]
  @funds.each do |fund|
    row = [fund.date.strftime("%F"),
           fund.entry,
           number_to_currency(fund.balance, delimiter: " ")]
    table_data.push(row)
  end
  sum_row = ["Summa: ",
             "",
             number_to_currency(@funds.sum(:balance),
                                delimiter: " ")]
  table_data.push(sum_row)
  pdf.table(table_data, cell_style: { border_color: "ECECEC" }) do
    style(row(0), font: "app/assets/fonts/palab.ttf")
    style(column(0), width: 60, overflow: :expand)
    style(column(2), single_line: true, width: 70, align: :right)
    style(row(-1), font: "app/assets/fonts/palab.ttf")
  end
end
