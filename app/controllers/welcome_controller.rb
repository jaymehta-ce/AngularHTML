class WelcomeController < ApplicationController

  # GET /welcome
  def index

  end
  def show
    render template: "assets/#{params[:page]}"
  end

end
