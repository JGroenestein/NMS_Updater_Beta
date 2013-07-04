module ApplicationHelper

  def active_page? (path)
    if current_page?(path)
      raw ('class=active')
    else
      ''
    end
  end

  def active_menu? (path)
    path ? 'active open' : ''
  end
end
