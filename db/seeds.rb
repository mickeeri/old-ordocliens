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

mobile = ContactType.create(contact_type_name: "Mobil")
ContactType.create(contact_type_name: "Telefon Hem")
ContactType.create(contact_type_name: "Telefon Arbete")
email = ContactType.create(contact_type_name: "E-post")

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

    client_name = "#{client.last_name} #{client.first_name}"

    client.contacts.create(
      contact: Faker::PhoneNumber.cell_phone,
      contact_type_id: mobile.id)

    client.contacts.create(
      contact: Faker::Internet.email(client_name),
      contact_type_id: e_mail_contact_type.id)

    number_of_cases = rand(2..6)
    number_of_cases.times do
      client.legal_cases.create(
        name: Faker::Lorem.characters(10),
        active: Faker::Boolean.boolean
      )
    end
  end
end
