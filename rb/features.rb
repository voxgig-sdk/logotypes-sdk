# Logotypes SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module LogotypesFeatures
  def self.make_feature(name)
    case name
    when "base"
      LogotypesBaseFeature.new
    when "test"
      LogotypesTestFeature.new
    else
      LogotypesBaseFeature.new
    end
  end
end
