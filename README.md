## Datavetenskap, självständigt arbete 1DV42E
###### Källkod för för praktiskt arbete VT-2016

### Ruby version
2.3.1 

### Databas 
PostgreSQL

### Körinstruktioner
1. [Installera Ruby on Rails](https://github.com/me222wm/1dv42e-me222wm-docs/blob/master/Deployment.md#2-installera-ruby-on-rails)
2. [Installera PosgreSQL](https://github.com/me222wm/1dv42e-me222wm-docs/blob/master/Deployment.md#3-installera-postgresql-databas)
3. [Poltergeist som JavaScript-driver för testning](https://github.com/me222wm/1dv42e-me222wm-docs/blob/master/Testspecifikation.md#testmiljö)
4. Klona repo
5. Skapa en `database.yml`-fil. 
6. Skapa en `secrets.yml`-fil. 
7. `bundle install`.
8. `rake db:setup`.
9. `rspec` för att köra testsviten. 
10. `rails s`
11. `http://localhost:3000/` 

### Körbar applikation
[ordocliens.se](https://ordocliens.se/)

### Testkonton med exempeldata
```
test@mail.com
password
```

```
jurist@mail.com
password
```

### Dokumentation
Finns [här](https://github.com/me222wm/1dv42e-me222wm-docs).
