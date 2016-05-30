prawn_document(:page_layout => :landscape) do |pdf|
  pdf.font "app/assets/fonts/pala.ttf"

  # A3		 842x1190

  require "open-uri"

  pdf.bounding_box([600, 750], :width => 300, :height => 100) do
    Prawn::Document.generate("lawsuit_cover.pdf") do
      pdf.image open("http://familjejuristerna.com/images/fj%20transp.png"), height: 48, width: 208
    end
  end

  pdf.bounding_box([1000, 750], :width => 300, :height => 100) do
    pdf.font_size 16
    pdf.text @lawsuit.slug
  end

  pdf.font_size 10.5

  pdf.bounding_box([600, 650], :width => 300, :height => 100) do
    pdf.text "Handläggare: #{@lawsuit.user.first_name} #{@lawsuit.user.last_name}", leading: 5
    pdf.text "Startdatum: #{@lawsuit.created_at.strftime('%F')}", leading: 5
    pdf.text "Ärendetyp: #{@lawsuit.lawsuit_type.name}", leading: 5
    pdf.text "Målnummer: #{@lawsuit.case_number}", leading: 5 unless @lawsuit.case_number.nil?
    pdf.text "Domstol: #{@lawsuit.court}", leading: 5 unless @lawsuit.court.nil?
  end


  pdf.bounding_box([600, 500], :width => 300, :height => 200) do
    client = @lawsuit.primary_client
    pdf.font "app/assets/fonts/palab.ttf"
    pdf.text "Klient", leading: 2
    pdf.font "app/assets/fonts/pala.ttf"
    pdf.text "#{client.first_name} #{client.last_name}", leading: 2
    pdf.text client.personal_number, leading: 2
    pdf.text client.street, leading: 2
    pdf.text "#{client.post_code} #{client.city}", leading: 2
    pdf.move_down 10
    pdf.text client.phone_number, leading: 2
    pdf.text client.mobile, leading: 2
    pdf.text client.email, leading: 2
  end

  if @lawsuit.counterparts.exists?
    pdf.bounding_box([900, 500], :width => 300, :height => 200) do
      counterpart = @lawsuit.counterparts.first
      pdf.font "app/assets/fonts/palab.ttf"
      pdf.text "Motpart", leading: 2
      pdf.font "app/assets/fonts/pala.ttf"
      pdf.text "#{counterpart.first_name} #{counterpart.last_name}", leading: 2
      pdf.text counterpart.personal_number, leading: 2
      pdf.font "app/assets/fonts/palab.ttf", leading: 2
      pdf.move_down 20
      pdf.text "Ombud", leading: 2
      pdf.font "app/assets/fonts/pala.ttf", leading: 2
      pdf.text counterpart.representative, leading: 2
    end
  end
end
