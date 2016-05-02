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

ActiveRecord::Schema.define(version: 20160502190655) do

  create_table "clients", force: :cascade do |t|
    t.string   "last_name"
    t.string   "first_name"
    t.string   "ssn"
    t.string   "street"
    t.string   "post_code"
    t.string   "city"
    t.text     "note"
    t.integer  "user_id"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.string   "email"
    t.string   "phone_number"
  end

  add_index "clients", ["first_name"], name: "index_clients_on_first_name"
  add_index "clients", ["last_name"], name: "index_clients_on_last_name"
  add_index "clients", ["ssn"], name: "index_clients_on_ssn"
  add_index "clients", ["user_id"], name: "index_clients_on_user_id"

  create_table "counterparts", force: :cascade do |t|
    t.string   "name"
    t.string   "personal_number"
    t.text     "info"
    t.string   "representative"
    t.integer  "client_id"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "counterparts", ["client_id"], name: "index_counterparts_on_client_id"

  create_table "expenses", force: :cascade do |t|
    t.text     "entry"
    t.decimal  "price"
    t.date     "date"
    t.integer  "legal_case_id"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  add_index "expenses", ["legal_case_id"], name: "index_expenses_on_legal_case_id"

  create_table "firms", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "legal_cases", force: :cascade do |t|
    t.integer  "client_id"
    t.string   "name"
    t.boolean  "closed",      default: false
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
    t.string   "court"
    t.string   "case_number"
  end

  add_index "legal_cases", ["client_id"], name: "index_legal_cases_on_client_id"

  create_table "price_categories", force: :cascade do |t|
    t.string   "name"
    t.decimal  "price"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "tasks", force: :cascade do |t|
    t.text     "entry"
    t.date     "date"
    t.decimal  "worked_hours"
    t.integer  "legal_case_id"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
    t.integer  "price_category_id"
  end

  add_index "tasks", ["legal_case_id"], name: "index_tasks_on_legal_case_id"
  add_index "tasks", ["price_category_id"], name: "index_tasks_on_price_category_id"

  create_table "users", force: :cascade do |t|
    t.string   "full_name"
    t.string   "user_name"
    t.integer  "firm_id"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true
  add_index "users", ["firm_id"], name: "index_users_on_firm_id"
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  add_index "users", ["user_name"], name: "index_users_on_user_name"

end
