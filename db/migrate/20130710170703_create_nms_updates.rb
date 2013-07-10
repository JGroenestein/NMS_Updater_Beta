class CreateNmsUpdates < ActiveRecord::Migration
  def change
    create_table :nms_updates do |t|

      t.string   :service_type
      t.string   :basestation
      t.string   :direction
      t.string   :device_make
      t.string   :device_model
      t.string   :ba_service_number
      t.string   :partner
      t.string   :business_name
      t.string   :address
      t.string   :ip_address
      t.string   :comments
      t.integer  :user_id

      t.timestamps
    end
    add_index :nms_updates, [:user_id, :created_at]
  end
end
