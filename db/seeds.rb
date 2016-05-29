# Firms
firm = Firm.create!(name: "Familjejuristerna Alverlind & Cederberg")
test_firm = Firm.create!(name: "Testfirma")

test_firm.users.create!(
  last_name: "Eriksson",
  first_name: "Mikael",
  email: "micke_eri@hotmail.com",
  password: "password",
  password_confirmation: "password"
)

# Users
firm.users.create(
  last_name: "Alverlind",
  first_name: "Daniel",
  email: "daniel@exempel.com",
  password: "password",
  password_confirmation: "password"
)

firm.users.create(
  last_name: "Cederberg",
  first_name: "Anders",
  email: "anders@exempel.com",
  password: "password",
  password_confirmation: "password"
)

# Price Categories
PriceCategory.create(name: "Tidsspillan (låg)", price: 700.00)
PriceCategory.create(name: "Tidsspillan (hög)", price: 1250.00)
PriceCategory.create(name: "Arbete", price: 1302.00)

lawsuit_types = ["Aktieägaravtal",
                 "Arvsrätt",
                 "Bodelning",
                 "Bodelningsförrättare",
                 "Bouppteckning",
                 "Boutredningsman",
                 "Dödsboförvaltning",
                 "Familjerättsliga avtal",
                 "Fastighetsrätt",
                 "Felregisterad",
                 "God man",
                 "LVU/LPT/LVM",
                 "Målsägandebiträde",
                 "Medling",
                 "Migrationsrätt",
                 "Offentlig försvarare",
                 "Övriga förordnanden",
                 "Övrigt",
                 "Partsombud",
                 "Rättegångsbiträde",
                 "Särskild företrädare barn",
                 "Underhåll",
                 "Vårdnadstvist"
                 ]

lawsuit_types.each do |type|
  LawsuitType.create(name: type)
end

test_firm.users.each do |user|
  # Clients
  number_of_clients = rand(100..120)
  sentece_lenght = rand(6..25)
  number_of_clients.times do
    client = user.clients.create(
      last_name: Faker::Name.last_name,
      first_name: Faker::Name.first_name,
      ssn: "#{Faker::Number.number(6)}-#{Faker::Number.number(4)}",
      email: Faker::Internet.email,
      phone_number: Faker::PhoneNumber.phone_number,
      mobile: "07#{Faker::Number.number(1)}-#{Faker::Number.number(7)}",
      street: Faker::Address.street_address,
      post_code: Faker::Number.number(5),
      city: Faker::Address.city,
      note: Faker::Lorem.sentence(sentece_lenght)
    )
    client_name = "#{client.last_name} #{client.first_name}"
    client.email = Faker::Internet.email(client_name)

    # Legal Cases
    number_of_lawsuits = 1
    number_of_lawsuits.times do
      lawsuit = user.lawsuits.create!(
        lawsuit_type_id: LawsuitType.offset(rand(LawsuitType.count)).first.id,
        closed: Faker::Boolean.boolean,
        primary_client_id: client.id
      )
      lawsuit.clients << client

      # Add slug
      first_name_initial = user.first_name[0, 1].downcase
      last_name_initial = user.last_name[0, 1].downcase
      initials = first_name_initial << last_name_initial
      slug = lawsuit.created_at.strftime("#{initials}%y-#{lawsuit.id}")
      lawsuit.update(slug: slug)

      # Counterparts
      number_of_counterparts = rand(1..2)
      number_of_counterparts.times do
        lawsuit.counterparts.create(
          first_name: Faker::Name.first_name,
          last_name: Faker::Name.last_name,
          personal_number:
            "#{Faker::Number.number(6)}-#{Faker::Number.number(4)}",
          info: Faker::Lorem.sentence(sentece_lenght),
          representative: Faker::Name.name
        )
      end

      # Add the client to all counterparts involved in lawsuit.
      lawsuit.counterparts.each do |counterpart|
        client.counterparts << counterpart
      end

      # Tasks
      number_of_tasks = rand(5..20)
      number_of_tasks.times do
        random_pc_id = PriceCategory.offset(rand(PriceCategory.count)).first.id
        lawsuit.tasks.create!(
          entry: Faker::Lorem.sentence(rand(3..20)),
          date: Faker::Time.between(2.years.ago, Time.zone.today, :day),
          worked_hours: Faker::Number.between(1, 8),
          price_category_id: random_pc_id
        )
      end
      # Expenses
      number_of_expenses = rand(5..10)
      number_of_expenses.times do
        lawsuit.expenses.create!(
          entry: Faker::Lorem.sentence(rand(3..15)),
          price: Faker::Number.between(500, 3000)
        )
      end
    end
  end
end
