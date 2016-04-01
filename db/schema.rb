# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160401144913) do

  create_table "clients", force: :cascade do |t|
    t.string   "last_name"
    t.string   "first_name"
    t.string   "ssn"
    t.string   "street"
    t.string   "post_code"
    t.string   "city"
    t.text     "note"
    t.integer  "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "clients", ["first_name"], name: "index_clients_on_first_name"
  add_index "clients", ["last_name"], name: "index_clients_on_last_name"
  add_index "clients", ["ssn"], name: "index_clients_on_ssn"
  add_index "clients", ["user_id"], name: "index_clients_on_user_id"

  create_table "firms", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "full_name"
    t.string   "user_name"
    t.string   "email"
    t.string   "password_digest"
    t.integer  "firm_id"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "users", ["firm_id"], name: "index_users_on_firm_id"
  add_index "users", ["user_name"], name: "index_users_on_user_name"

end
