class NmsUpdate < ActiveRecord::Base
   attr_accessible :service_type, :basestation, :direction, :device_make, :device_model,
                   :ba_service_number, :partner, :business_name, :address, :ip_address, :comments

   belongs_to :user


   validates :user_id, presence: true

   default_scope order: 'nms_updates.created_at DESC'
end
