prawn_document(page_layout: :landscape) do |pdf|
  pdf.font "app/assets/fonts/pala.ttf"

  # A3		 842x1190

  require "open-uri"

  logo = @lawsuit.user.firm.logo

  pdf.bounding_box([600, 750], width: 300, height: 100) do
    Prawn::Document.generate("lawsuit_cover.pdf") do
      pdf.image open(logo), height: 48, width: 208 if logo
    end
  end

  pdf.bounding_box([1000, 750], width: 300, height: 100) do
    pdf.font_size 16
    pdf.text @lawsuit.slug
  end

  pdf.font_size 10.5

  pdf.bounding_box([600, 650], width: 300, height: 100) do
    pdf.text "Handläggare: #{@lawsuit.user.first_name} #{@lawsuit.user.last_name}", leading: 5
    pdf.text "Startdatum: #{@lawsuit.created_at.strftime('%F')}", leading: 5
    pdf.text "Ärendetyp: #{@lawsuit.lawsuit_type.name}", leading: 5
    pdf.text "Målnummer: #{@lawsuit.case_number}", leading: 5 if @lawsuit.case_number.present?
    pdf.text "Domstol: #{@lawsuit.court}", leading: 5 if @lawsuit.court.present?
  end


  pdf.bounding_box([600, 500], width: 300, height: 1000) do
    primary_client = @lawsuit.primary_client
    pdf.font "app/assets/fonts/palab.ttf"
    pdf.text @lawsuit.clients.count > 1 ? "Klienter" : "Klient", leading: 2
    pdf.font "app/assets/fonts/pala.ttf"
    pdf.text "#{primary_client.first_name} #{primary_client.last_name}", leading: 2
    pdf.text primary_client.personal_number, leading: 2
    pdf.text "c/o #{primary_client.co}", leading: 2 if primary_client.co.present?
    pdf.text primary_client.street, leading: 2
    pdf.text "#{primary_client.post_code} #{primary_client.city}", leading: 2
    pdf.move_down 10
    pdf.text primary_client.phone_number, leading: 2
    pdf.text primary_client.mobile, leading: 2
    pdf.text primary_client.email, leading: 2

    @lawsuit.clients.each do |client|
      next if client.id == primary_client.id
      pdf.move_down 10
      pdf.text "#{client.first_name} #{client.last_name}", leading: 2
      pdf.text client.personal_number, leading: 2
    end
  end

  if @lawsuit.counterparts.exists?
    pdf.bounding_box([900, 500], width: 300, height: 1000) do
      pdf.font "app/assets/fonts/palab.ttf"
      pdf.text @lawsuit.counterparts.count > 1 ? "Motparter" : "Motpart", leading: 2
      @lawsuit.counterparts.each do |counterpart|
        pdf.move_down 10 unless @lawsuit.counterparts.first == counterpart
        pdf.font "app/assets/fonts/pala.ttf"
        pdf.text "#{counterpart.first_name} #{counterpart.last_name}", leading: 2
        pdf.text counterpart.personal_number, leading: 2
        pdf.text counterpart.info, leading: 2
        pdf.text "Ombud", leading: 2
        pdf.font "app/assets/fonts/pala.ttf", leading: 2
        pdf.text counterpart.representative, leading: 2
      end
    end
  end
end
