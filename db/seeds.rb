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

User.all.each do |user|
  number_of_clients = rand(100..200)
  sentece_lenght = rand(10..100)
  number_of_clients.times do
    client = user.clients.create(
      last_name: Faker::Name.last_name,
      first_name: Faker::Name.first_name,
      ssn: Faker::Number.number(10),
      street: Faker::Address.street_address,
      post_code: Faker::Address.postcode,
      city: Faker::Address.city,
      note: Faker::Lorem.sentence(sentece_lenght)
    )

    number_of_cases = rand(2..6)
    number_of_cases.times do
      client.legal_cases.create(
        name: Faker::Lorem.characters(10),
        active: Faker::Boolean.boolean
      )
    end
  end
end
