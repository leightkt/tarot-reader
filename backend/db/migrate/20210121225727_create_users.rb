class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :user_name
      t.string :user_password
      t.string :name
      t.string :zodiac_sign

      t.timestamps
    end
  end
end
