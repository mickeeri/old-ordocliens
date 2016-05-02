# Firms
firm = Firm.create!(name: "My firm")

# Users
firm.users.create(
  full_name: "Mikael Eriksson",
  user_name: "micke",
  email: "micke@mail.com",
  password: "password",
  password_confirmation: "password"
)

firm.users.create(
  full_name: "Anders Cederberg",
  user_name: "ac",
  email: "anders.cederberg@mail.com",
  password: "password",
  password_confirmation: "password"
)

# Price Categories
PriceCategory.create(name: "Tidsspillan (låg)", price: 700.00)
PriceCategory.create(name: "Tidsspillan (hög)", price: 1250.00)
PriceCategory.create(name: "Arbete", price: 1302.00)

User.all.each do |user|
  # Clients
  number_of_clients = rand(200..500)
  sentece_lenght = rand(10..25)
  number_of_clients.times do
    client = user.clients.create(
      last_name: Faker::Name.last_name,
      first_name: Faker::Name.first_name,
      ssn: Faker::Number.number(10),
      email: Faker::Internet.email,
      phone_number: Faker::PhoneNumber.cell_phone,
      street: Faker::Address.street_address,
      post_code: Faker::Address.postcode,
      city: Faker::Address.city,
      note: Faker::Lorem.sentence(sentece_lenght)
    )
    client_name = "#{client.last_name} #{client.first_name}"
    client.email = Faker::Internet.email(client_name)

    # Counterparts
    number_of_counterparts = rand(1..10)
    number_of_counterparts.times do
      client.counterparts.create(
        name: Faker::Name.name,
        personal_number: Faker::Number.number(10),
        info: Faker::Lorem.sentence(sentece_lenght),
        representative: Faker::Name.name
      )
    end

    # Legal Cases
    number_of_cases = rand(1..3)
    number_of_cases.times do
      l_case = client.legal_cases.create(
        name: Faker::Lorem.characters(10),
        closed: Faker::Boolean.boolean
      )

      # Tasks
      number_of_tasks = rand(5..15)
      number_of_tasks.times do
        random_pc_id = PriceCategory.offset(rand(PriceCategory.count)).first.id
        l_case.tasks.create!(
          entry: Faker::Lorem.sentence(rand(10..30)),
          date: Faker::Time.between(2.days.ago, Time.zone.today, :day),
          worked_hours: rand(1.25..8.35),
          price_category_id: random_pc_id
        )
      end
    end
  end
end
